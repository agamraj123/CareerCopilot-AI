const User = require("../models/User");
const Resume = require("../models/Resume");
const JobMatch = require("../models/JobMatch");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const {
    successResponse,
} = require("../utils/apiResponse");

// =====================================
// Helper - Find User
// =====================================

const findUser = async (userId) => {

    const user = await User.findById(userId)

        .select("-password");

    if (!user) {

        throw new AppError(

            "User not found.",

            404

        );

    }

    return user;

};

// =====================================
// Get Dashboard
// =====================================

const getDashboard = asyncHandler(async (req, res) => {

    // ================================
    // User
    // ================================

    const user = await findUser(

        req.user.id

    );

    // ================================
    // Resume
    // ================================

    const resume = await Resume.findOne({

        userId: req.user.id,

    });

    // ================================
    // Job Matches
    // ================================

    const jobMatches = await JobMatch.find({

        userId: req.user.id,

    }).sort({

        createdAt: -1,

    });

    // ================================
    // Statistics
    // ================================

    const totalApplications = jobMatches.length;

    const highestMatch = totalApplications

        ? Math.max(

            ...jobMatches.map(

                job => job.overallMatch

            )

        )

        : 0;

    const averageMatch = totalApplications

        ? Math.round(

            jobMatches.reduce(

                (sum, job) =>

                    sum + job.overallMatch,

                0

            ) / totalApplications

        )

        : 0;

    const interviews = jobMatches.filter(

        job =>

            job.status === "Interview"

    ).length;

    const offers = jobMatches.filter(

        job =>

            job.status === "Offer"

    ).length;

    // ================================
    // Completion
    // ================================

    const completion = {

        profile: 100,

        resume: resume ? 100 : 0,

        jobMatches:

            totalApplications > 0

                ? 100

                : 0,

    };

    // ================================
    // Recent Matches
    // ================================

    const recentMatches = jobMatches

        .slice(0, 5)

        .map(job => ({

            id: job._id,

            companyName: job.companyName,

            jobTitle: job.jobTitle,

            overallMatch: job.overallMatch,

            status: job.status,

            createdAt: job.createdAt,

        }));

    // ================================
    // Response
    // ================================

    return successResponse(

        res,

        {

            completion,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

            },

            resume: {

                isResumeUploaded: !!resume,

                fileName:

                    resume?.fileName || null,

                resumeScore:

                    resume?.aiAnalysis

                        ?.resumeScore || 0,

                technicalSkillsCount:

                    resume?.aiAnalysis

                        ?.technicalSkills

                        ?.length || 0,

                softSkillsCount:

                    resume?.aiAnalysis

                        ?.softSkills

                        ?.length || 0,

                analyzedAt:

                    resume?.aiAnalysis

                        ?.metadata

                        ?.analyzedAt || null,

            },

            statistics: {

                totalApplications,

                averageMatch,

                highestMatch,

                interviews,

                offers,

                resumeUploads:

                    resume ? 1 : 0,

            },

            recentMatches,

        },

        "Dashboard loaded successfully."

    );

});

module.exports = {

    getDashboard,

};