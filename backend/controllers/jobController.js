const Resume = require("../models/Resume");
const JobMatch = require("../models/JobMatch");

const {
    analyzeJobMatch,
} = require("../services/jobMatchService");

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
// Helper - Find User Job
// =====================================

const findUserJob = async (jobId, userId) => {

    const job = await JobMatch.findOne({

        _id: jobId,

        userId,

    });

    if (!job) {

        throw new AppError(

            "Job analysis not found.",

            404

        );

    }

    return job;

};

// =====================================
// Analyze Job Match
// =====================================

const analyzeJob = asyncHandler(async (req, res) => {

    const {

        companyName,

        jobTitle,

        jobDescription,

    } = req.body;


    const resume = await findUserResume(

        req.user.id

    );

    const analysis = await analyzeJobMatch(

        resume.resumeText,

        jobDescription

    );

    const jobMatch = await JobMatch.create({

        userId: req.user.id,

        resumeId: resume._id,

        companyName,

        jobTitle,

        jobDescription,

        ...analysis,

    });

    return successResponse(

        res,

        jobMatch,

        "Job match analyzed successfully.",

        201

    );

});

// =====================================
// Get Job Match History
// =====================================

const getJobHistory = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const company = req.query.company;

    const status = req.query.status;

    const sort = req.query.sort || "latest";

    const filter = {

        userId: req.user.id,

    };

    if (company) {

        filter.companyName = {

            $regex: company,

            $options: "i",

        };

    }

    if (status) {

        filter.status = status;

    }

    let sortOption = {

        createdAt: -1,

    };

    if (sort === "oldest") {

        sortOption = {

            createdAt: 1,

        };

    }

    if (sort === "highestMatch") {

        sortOption = {

            overallMatch: -1,

        };

    }

    const jobs = await JobMatch.find(filter)

        .sort(sortOption)

        .skip(skip)

        .limit(limit);

    const totalJobs = await JobMatch.countDocuments(filter);

    return successResponse(

        res,

        {

            currentPage: page,

            totalPages: Math.ceil(

                totalJobs / limit

            ),

            totalJobs,

            jobs,

        },

        "Job history fetched successfully."

    );

});

// =====================================
// Get Single Job Analysis
// =====================================

const getJobById = asyncHandler(async (req, res) => {

    const job = await findUserJob(

        req.params.id,

        req.user.id

    );

    return successResponse(

        res,

        job,

        "Job analysis fetched successfully."

    );

});

// =====================================
// Update Job Status
// =====================================

const updateJobStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;

    const allowedStatus = [

        "Analyzed",

        "Applied",

        "Interview",

        "Rejected",

        "Offer",

    ];

    if (

        !allowedStatus.includes(status)

    ) {

        throw new AppError(

            "Invalid status.",

            400

        );

    }

    const job = await findUserJob(

        req.params.id,

        req.user.id

    );

    job.status = status;

    await job.save();

    return successResponse(

        res,

        job,

        "Status updated successfully."

    );

});

// =====================================
// Delete Job Analysis
// =====================================

const deleteJob = asyncHandler(async (req, res) => {

    const job = await findUserJob(

        req.params.id,

        req.user.id

    );

    await job.deleteOne();

    return successResponse(

        res,

        null,

        "Job analysis deleted successfully."

    );

});

module.exports = {

    analyzeJob,

    getJobHistory,

    getJobById,

    updateJobStatus,

    deleteJob,

};