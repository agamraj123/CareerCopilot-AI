const Resume = require("../models/Resume");
const CoverLetter = require("../models/CoverLetter");

const {
    generateCoverLetter,
} = require("../services/coverLetterService");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const {
    successResponse,
} = require("../utils/apiResponse");

// =====================================
// Helper - Find User Resume
// =====================================

const findUserResume = async (userId) => {

    const resume = await Resume.findOne({

        userId,

    });

    if (!resume) {

        throw new AppError(

            "Please upload your resume first.",

            404

        );

    }

    return resume;

};

// =====================================
// Helper - Find Cover Letter
// =====================================

const findCoverLetter = async (coverLetterId, userId) => {

    const coverLetter = await CoverLetter.findOne({

        _id: coverLetterId,

        userId,

    });

    if (!coverLetter) {

        throw new AppError(

            "Cover letter not found.",

            404

        );

    }

    return coverLetter;

};

// =====================================
// Generate Cover Letter
// =====================================

const createCoverLetter = asyncHandler(async (req, res) => {

    const {

        companyName,

        jobTitle,

        jobDescription,

    } = req.body;


    const resume = await findUserResume(

        req.user.id

    );

    const aiResponse = await generateCoverLetter(

        resume.resumeText,

        companyName,

        jobTitle,

        jobDescription

    );

    const coverLetter = await CoverLetter.create({

        userId: req.user.id,

        resumeId: resume._id,

        companyName,

        jobTitle,

        jobDescription,

        ...aiResponse,

    });

    return successResponse(

        res,

        coverLetter,

        "Cover letter generated successfully.",

        201

    );

});

// =====================================
// Get Cover Letter History
// =====================================

const getCoverLetterHistory = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const company = req.query.company;

    const jobTitle = req.query.jobTitle;

    const minScore = Number(req.query.minScore) || 0;

    const sort = req.query.sort || "latest";

    const filter = {

        userId: req.user.id,

        customizationScore: {

            $gte: minScore,

        },

    };

    if (company) {

        filter.companyName = {

            $regex: company,

            $options: "i",

        };

    }

    if (jobTitle) {

        filter.jobTitle = {

            $regex: jobTitle,

            $options: "i",

        };

    }

    let sortOption = {

        createdAt: -1,

    };

    if (sort === "oldest") {

        sortOption = {

            createdAt: 1,

        };

    }

    if (sort === "highestScore") {

        sortOption = {

            customizationScore: -1,

        };

    }

    const coverLetters = await CoverLetter.find(filter)

        .sort(sortOption)

        .skip(skip)

        .limit(limit);

    const totalCoverLetters = await CoverLetter.countDocuments(

        filter

    );

    const aggregation = await CoverLetter.aggregate([

        {

            $match: filter,

        },

        {

            $group: {

                _id: null,

                avgScore: {

                    $avg: "$customizationScore",

                },

            },

        },

    ]);

    const averageCustomizationScore =

        aggregation.length > 0

            ? Math.round(aggregation[0].avgScore)

            : 0;

    const recentCoverLetters = coverLetters.map(letter => ({

        id: letter._id,

        companyName: letter.companyName,

        jobTitle: letter.jobTitle,

        customizationScore: letter.customizationScore,

        createdAt: letter.createdAt,

    }));

    return successResponse(

        res,

        {

            currentPage: page,

            totalPages: Math.ceil(

                totalCoverLetters / limit

            ),

            totalCoverLetters,

            averageCustomizationScore,

            recentCoverLetters,

            coverLetters,

        },

        "Cover letter history fetched successfully."

    );

});

// =====================================
// Get Single Cover Letter
// =====================================

const getCoverLetterById = asyncHandler(async (req, res) => {

    const coverLetter = await findCoverLetter(

        req.params.id,

        req.user.id

    );

    return successResponse(

        res,

        coverLetter,

        "Cover letter fetched successfully."

    );

});

// =====================================
// Delete Cover Letter
// =====================================

const deleteCoverLetter = asyncHandler(async (req, res) => {

    const coverLetter = await findCoverLetter(

        req.params.id,

        req.user.id

    );

    await coverLetter.deleteOne();

    return successResponse(

        res,

        null,

        "Cover letter deleted successfully."

    );

});

module.exports = {

    createCoverLetter,

    getCoverLetterHistory,

    getCoverLetterById,

    deleteCoverLetter,

};