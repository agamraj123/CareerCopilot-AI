import {
    Activity,
    ArrowRight,
    Award,
    BarChart3,
    Brain,
    BriefcaseBusiness,
    CheckCircle2,
    CircleAlert,
    FileSignature,
    FileText,
    FolderOpen,
    Lightbulb,
    Sparkles,
    Target,
    TrendingUp,
    Upload,
    UserRound,
} from "lucide-react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../../api/dashboardApi";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getDashboard();

                setDashboard(response.data.data);
            } catch (err) {
                console.error("Dashboard fetch error:", err);

                setError(
                    err?.response?.data?.message ||
                        "Unable to load your dashboard."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
                    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                            <CircleAlert
                                size={26}
                                className="text-blue-600"
                            />
                        </div>

                        <h2 className="mt-4 text-xl font-bold text-blue-950">
                            Dashboard unavailable
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                        >
                            Try Again
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const statistics = dashboard?.statistics || {};
    const resume = dashboard?.resume || null;
    const completion = dashboard?.completion || {};
    const recentMatches = dashboard?.recentMatches || [];

    const totalApplications = Number(
        statistics.totalApplications ?? 0
    );

    const highestMatch = Number(
        statistics.highestMatch ?? 0
    );

    const averageMatch = Number(
        statistics.averageMatch ?? 0
    );

    const interviews = Number(
        statistics.interviews ?? 0
    );

    const offers = Number(
        statistics.offers ?? 0
    );

    const profileCompletion = Number(
        completion.profile ?? 0
    );

    const resumeCompletion = Number(
        completion.resume ?? 0
    );

    const jobMatchCompletion = Number(
        completion.jobMatches ?? 0
    );

    const overallReadiness = Math.round(
        (profileCompletion +
            resumeCompletion +
            jobMatchCompletion) /
            3
    );

    const userName =
        dashboard?.user?.name ||
        user?.name ||
        "there";

    const firstName =
        userName.split(" ")[0] || "there";

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-white">
            <main className="mx-auto w-full max-w-7xl min-w-0 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">

                {/* ================================================== */}
                {/* HEADER */}
                {/* ================================================== */}

                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mb-8"
                >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                                    <Sparkles
                                        size={16}
                                        className="text-blue-600"
                                    />
                                </div>

                                <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                                    Career Command Center
                                </span>
                            </div>

                            <h1 className="truncate text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl">
                                Welcome back, {firstName}
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                Keep improving your profile, matching better
                                opportunities, and preparing for your next
                                interview.
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/resume")}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                            >
                                <FileText size={16} />
                                Resume
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/jobs")}
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                            >
                                <BriefcaseBusiness size={16} />
                                Analyze Job
                            </button>
                        </div>
                    </div>
                </motion.header>

                {/* ================================================== */}
                {/* CAREER READINESS */}
                {/* ================================================== */}

                <motion.section
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.03 }}
                    className="mb-8 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm"
                >
                    <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                        <div className="min-w-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <Target
                                        size={21}
                                        className="text-blue-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                        Career Readiness
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-blue-950">
                                        Your profile is {overallReadiness}% ready
                                    </h2>
                                </div>
                            </div>

                            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                                Complete your resume, job matching activity,
                                and profile setup to build a stronger
                                application strategy.
                            </p>

                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${Math.min(
                                            Math.max(
                                                overallReadiness,
                                                0
                                            ),
                                            100
                                        )}%`,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.2,
                                    }}
                                    className="h-full rounded-full bg-blue-600"
                                />
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                                <span>
                                    Profile{" "}
                                    <strong className="text-blue-950">
                                        {profileCompletion}%
                                    </strong>
                                </span>

                                <span>
                                    Resume{" "}
                                    <strong className="text-blue-950">
                                        {resumeCompletion}%
                                    </strong>
                                </span>

                                <span>
                                    Job Matches{" "}
                                    <strong className="text-blue-950">
                                        {jobMatchCompletion}%
                                    </strong>
                                </span>
                            </div>
                        </div>

                        <ReadinessRing
                            value={overallReadiness}
                        />
                    </div>
                </motion.section>

                {/* ================================================== */}
                {/* STATISTICS */}
                {/* ================================================== */}

                <section className="mb-8">
                    <div className="mb-4">
                        <SectionHeader
                            icon={BarChart3}
                            title="Career Overview"
                            description="A quick snapshot of your current progress."
                        />
                    </div>

                    <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            icon={BriefcaseBusiness}
                            label="Applications"
                            value={totalApplications}
                            description="Jobs analyzed"
                            delay={0}
                        />

                        <StatCard
                            icon={TrendingUp}
                            label="Highest Match"
                            value={`${highestMatch}%`}
                            description="Best job alignment"
                            highlighted
                            delay={0.05}
                        />

                        <StatCard
                            icon={Activity}
                            label="Interviews"
                            value={interviews}
                            description="Interview stage"
                            delay={0.1}
                        />

                        <StatCard
                            icon={Award}
                            label="Offers"
                            value={offers}
                            description="Offers received"
                            delay={0.15}
                        />
                    </div>
                </section>

                {/* ================================================== */}
                {/* MAIN CONTENT */}
                {/* ================================================== */}

                <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">

                    {/* ================================================== */}
                    {/* LEFT COLUMN */}
                    {/* ================================================== */}

                    <div className="min-w-0 space-y-8">

                        {/* ================================================== */}
                        {/* RESUME INTELLIGENCE */}
                        {/* ================================================== */}

                        <motion.section
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.2,
                            }}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            <div className="border-b border-slate-100 px-6 py-5">
                                <SectionHeader
                                    icon={FileText}
                                    title="Resume Intelligence"
                                    description="Understand how strong your resume is for your career goals."
                                    action={
                                        resume
                                            ? "View Resume"
                                            : "Upload Resume"
                                    }
                                    onClick={() =>
                                        navigate("/resume")
                                    }
                                />
                            </div>

                            <div className="p-6">
                                {resume ? (
                                    <>
                                        <div className="grid gap-4 sm:grid-cols-3">
                                            <MetricBox
                                                label="Resume Score"
                                                value={`${Number(
                                                    resume.aiAnalysis
                                                        ?.resumeScore ?? 0
                                                )}%`}
                                                icon={Target}
                                                highlighted
                                            />

                                            <MetricBox
                                                label="Technical Skills"
                                                value={
                                                    resume.aiAnalysis
                                                        ?.technicalSkills
                                                        ?.length || 0
                                                }
                                                icon={Brain}
                                            />

                                            <MetricBox
                                                label="Missing Skills"
                                                value={
                                                    resume.aiAnalysis
                                                        ?.missingSkills
                                                        ?.length || 0
                                                }
                                                icon={CircleAlert}
                                            />
                                        </div>

                                        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                                                    <FileText
                                                        size={18}
                                                        className="text-blue-600"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-blue-950">
                                                        {resume.fileName ||
                                                            "Current Resume"}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-slate-500">
                                                        AI analysis available
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate("/resume")
                                                }
                                                className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                                            >
                                                Open analysis
                                                <ArrowRight
                                                    size={15}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <EmptyState
                                        icon={Upload}
                                        title="Upload your resume"
                                        description="Get an AI-powered analysis of your resume, skills, strengths, weaknesses, and improvement areas."
                                        action="Upload Resume"
                                        onClick={() =>
                                            navigate("/resume")
                                        }
                                    />
                                )}
                            </div>
                        </motion.section>

                        {/* ================================================== */}
                        {/* JOB SEARCH INTELLIGENCE */}
                        {/* ================================================== */}

                        <motion.section
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.28,
                            }}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            <div className="border-b border-slate-100 px-6 py-5">
                                <SectionHeader
                                    icon={BriefcaseBusiness}
                                    title="Job Search Intelligence"
                                    description="Track how your profile aligns with target roles."
                                    action="Analyze Job"
                                    onClick={() =>
                                        navigate("/jobs")
                                    }
                                />
                            </div>

                            <div className="p-6">
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <JobMetric
                                        label="Highest Match"
                                        value={`${highestMatch}%`}
                                        highlighted
                                    />

                                    <JobMetric
                                        label="Average Match"
                                        value={`${averageMatch}%`}
                                    />

                                    <JobMetric
                                        label="Applications"
                                        value={totalApplications}
                                    />
                                </div>

                                {recentMatches.length > 0 ? (
                                    <div className="mt-6">
                                        <div className="mb-3 flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-bold text-blue-950">
                                                    Recent Matches
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    Your latest analyzed
                                                    opportunities
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate("/jobs")
                                                }
                                                className="group flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                                            >
                                                View all
                                                <ArrowRight
                                                    size={14}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            {recentMatches
                                                .slice(0, 3)
                                                .map(
                                                    (
                                                        job,
                                                        index
                                                    ) => (
                                                        <RecentJob
                                                            key={
                                                                job._id ||
                                                                index
                                                            }
                                                            job={job}
                                                            onClick={() =>
                                                                navigate(
                                                                    "/jobs"
                                                                )
                                                            }
                                                        />
                                                    )
                                                )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-7 text-center">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                                            <Target
                                                size={22}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <h3 className="mt-3 text-sm font-bold text-blue-950">
                                            Start matching jobs
                                        </h3>

                                        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
                                            Compare your resume against job
                                            descriptions to discover matched
                                            skills and areas you can improve.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate("/jobs")
                                            }
                                            className="group mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                                        >
                                            Analyze a Job
                                            <ArrowRight
                                                size={14}
                                                className="transition-transform group-hover:translate-x-0.5"
                                            />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    </div>

                    {/* ================================================== */}
                    {/* RIGHT COLUMN */}
                    {/* ================================================== */}

                    <div className="min-w-0 space-y-6">

                        {/* ================================================== */}
                        {/* CAREER WORKSPACE */}
                        {/* ================================================== */}

                        <motion.section
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.32,
                            }}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            <div className="border-b border-slate-100 px-6 py-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                        <FolderOpen
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="text-base font-bold text-blue-950 sm:text-lg">
                                            Career Workspace
                                        </h2>

                                        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                                            Everything you need to move your
                                            job search forward.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-3 p-4">
                                <QuickAction
                                    icon={FileText}
                                    title="Resume Analysis"
                                    description="Improve your resume with AI-powered insights."
                                    onClick={() =>
                                        navigate("/resume")
                                    }
                                />

                                <QuickAction
                                    icon={BriefcaseBusiness}
                                    title="Job Matching"
                                    description="See how well your profile fits target roles."
                                    onClick={() =>
                                        navigate("/jobs")
                                    }
                                />

                                <QuickAction
                                    icon={Brain}
                                    title="Interview Preparation"
                                    description="Practice questions tailored to your career."
                                    onClick={() =>
                                        navigate("/interview")
                                    }
                                />

                                <QuickAction
                                    icon={FileSignature}
                                    title="Cover Letter"
                                    description="Create a tailored letter for your application."
                                    onClick={() =>
                                        navigate("/cover-letter")
                                    }
                                />
                            </div>
                        </motion.section>

                        {/* ================================================== */}
                        {/* AI INSIGHT */}
                        {/* ================================================== */}

                        <motion.section
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.36,
                            }}
                            className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/60 shadow-sm"
                        >
                            <div className="p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                        <Lightbulb
                                            size={19}
                                            className="text-blue-600"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                            AI Insight
                                        </p>

                                        <h3 className="mt-1 text-base font-bold text-blue-950">
                                            Turn insights into action
                                        </h3>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm leading-6 text-slate-600">
                                    Your resume analysis and job matches can
                                    help you identify the skills to improve
                                    and the areas to focus on before your next
                                    application or interview.
                                </p>

                                <div className="mt-5 grid gap-2">
                                    <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white/80 px-3 py-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                                            <Target
                                                size={14}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <span className="text-xs font-medium text-slate-600">
                                            Identify your strongest skills
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white/80 px-3 py-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                                            <TrendingUp
                                                size={14}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <span className="text-xs font-medium text-slate-600">
                                            Improve your job match score
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white/80 px-3 py-3">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                                            <Brain
                                                size={14}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <span className="text-xs font-medium text-slate-600">
                                            Prepare for role-specific
                                            interviews
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/interview")
                                    }
                                    className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                                >
                                    Start interview preparation

                                    <ArrowRight
                                        size={15}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </button>
                            </div>
                        </motion.section>

                        {/* ================================================== */}
                        {/* PROFILE SETUP */}
                        {/* ================================================== */}

                        <motion.section
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.4,
                            }}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <SectionHeader
                                icon={UserRound}
                                title="Profile Setup"
                                description="Keep your workspace ready."
                            />

                            <div className="mt-5 space-y-3">
                                <SetupItem
                                    label="Profile"
                                    completed={
                                        profileCompletion >= 100
                                    }
                                />

                                <SetupItem
                                    label="Resume"
                                    completed={
                                        resumeCompletion >= 100
                                    }
                                />

                                <SetupItem
                                    label="Job Match"
                                    completed={
                                        jobMatchCompletion >= 100
                                    }
                                />
                            </div>
                        </motion.section>
                    </div>
                </div>

                {/* ================================================== */}
                {/* RECENT JOB ACTIVITY */}
                {/* ================================================== */}

                {recentMatches.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.45,
                        }}
                        className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                        <div className="border-b border-slate-100 px-6 py-5">
                            <SectionHeader
                                icon={BarChart3}
                                title="Recent Job Activity"
                                description="Review the opportunities you have analyzed recently."
                                action="Open Job Matching"
                                onClick={() =>
                                    navigate("/jobs")
                                }
                            />
                        </div>

                        <div className="divide-y divide-slate-100">
                            {recentMatches
                                .slice(0, 5)
                                .map((job, index) => (
                                    <RecentJob
                                        key={
                                            job._id ||
                                            `recent-${index}`
                                        }
                                        job={job}
                                        onClick={() =>
                                            navigate("/jobs")
                                        }
                                    />
                                ))}
                        </div>
                    </motion.section>
                )}
            </main>
        </div>
    );
};

/* ================================================================ */
/* STAT CARD */
/* ================================================================ */

const StatCard = ({
    icon: Icon,
    label,
    value,
    description,
    highlighted = false,
    delay = 0,
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 12,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.35,
                delay,
            }}
            className="
                group
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                text-left
                shadow-sm
                transition-all
                duration-200
                hover:border-blue-200
                hover:shadow-md
            "
        >
            <div className="flex items-start justify-between gap-3">
                <div
                    className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${
                            highlighted
                                ? "bg-blue-50"
                                : "bg-slate-50"
                        }
                    `}
                >
                    <Icon
                        size={19}
                        className={
                            highlighted
                                ? "text-blue-600"
                                : "text-slate-500"
                        }
                    />
                </div>

                {highlighted && (
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600">
                        Best
                    </span>
                )}
            </div>

            <p className="mt-4 text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-2xl font-bold leading-none text-blue-950">
                {value}
            </p>

            <p className="mt-2 text-xs text-slate-400">
                {description}
            </p>
        </motion.div>
    );
};

/* ================================================================ */
/* SECTION HEADER */
/* ================================================================ */

const SectionHeader = ({
    icon: Icon,
    title,
    description,
    action,
    onClick,
}) => {
    return (
        <div className="flex min-w-0 items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <Icon
                        size={18}
                        className="text-blue-600"
                    />
                </div>

                <div className="min-w-0">
                    <h2 className="text-base font-bold text-blue-950 sm:text-lg">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {action && onClick && (
                <button
                    type="button"
                    onClick={onClick}
                    className="group flex shrink-0 items-center gap-1.5 text-xs font-semibold text-blue-600 transition hover:text-blue-700 sm:text-sm"
                >
                    <span className="hidden sm:inline">
                        {action}
                    </span>

                    <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </button>
            )}
        </div>
    );
};

/* ================================================================ */
/* METRIC BOX */
/* ================================================================ */

const MetricBox = ({
    label,
    value,
    icon: Icon,
    highlighted = false,
}) => {
    return (
        <div
            className={`
                group
                rounded-xl
                border
                p-4
                transition-all
                duration-200
                ${
                    highlighted
                        ? "border-blue-100 bg-blue-50 hover:border-blue-200"
                        : "border-slate-100 bg-slate-50 hover:border-blue-100 hover:bg-blue-50/40"
                }
            `}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-500">
                        {label}
                    </p>

                    <p
                        className={`
                            mt-2
                            text-2xl
                            font-bold
                            leading-none
                            ${
                                highlighted
                                    ? "text-blue-600"
                                    : "text-blue-950"
                            }
                        `}
                    >
                        {value}
                    </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Icon
                        size={15}
                        className={
                            highlighted
                                ? "text-blue-600"
                                : "text-slate-500"
                        }
                    />
                </div>
            </div>
        </div>
    );
};

/* ================================================================ */
/* JOB METRIC */
/* ================================================================ */

const JobMetric = ({
    label,
    value,
    highlighted = false,
}) => {
    return (
        <div
            className={`
                group
                rounded-xl
                border
                p-4
                transition-all
                duration-200
                ${
                    highlighted
                        ? "border-blue-100 bg-blue-50 hover:border-blue-200"
                        : "border-slate-100 bg-slate-50 hover:border-blue-100 hover:bg-blue-50/40"
                }
            `}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-500">
                        {label}
                    </p>

                    <p
                        className={`
                            mt-2
                            text-2xl
                            font-bold
                            leading-none
                            ${
                                highlighted
                                    ? "text-blue-600"
                                    : "text-blue-950"
                            }
                        `}
                    >
                        {value}
                    </p>
                </div>

                {highlighted && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
                        <TrendingUp
                            size={14}
                            className="text-blue-600"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

/* ================================================================ */
/* QUICK ACTION */
/* ================================================================ */

const QuickAction = ({
    icon: Icon,
    title,
    description,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                group
                flex
                w-full
                min-w-0
                items-center
                gap-3
                rounded-xl
                border
                border-slate-100
                bg-slate-50/60
                p-3
                text-left
                transition-all
                duration-200
                hover:border-blue-100
                hover:bg-blue-50
                hover:shadow-sm
            "
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-200 group-hover:bg-blue-600 group-hover:shadow-md">
                <Icon
                    size={17}
                    className="text-blue-600 transition-colors duration-200 group-hover:text-white"
                />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-blue-950">
                    {title}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500 transition-colors group-hover:text-slate-600">
                    {description}
                </p>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white opacity-70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-white group-hover:opacity-100">
                <ArrowRight
                    size={15}
                    className="text-slate-400 transition-colors group-hover:text-blue-600"
                />
            </div>
        </button>
    );
};

/* ================================================================ */
/* SETUP ITEM */
/* ================================================================ */

const SetupItem = ({
    label,
    completed,
}) => {
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
            <div className="flex items-center gap-3">
                <div
                    className={`
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        ${
                            completed
                                ? "bg-blue-100"
                                : "bg-white"
                        }
                    `}
                >
                    <CheckCircle2
                        size={16}
                        className={
                            completed
                                ? "text-blue-600"
                                : "text-slate-300"
                        }
                    />
                </div>

                <span className="text-sm font-medium text-slate-700">
                    {label}
                </span>
            </div>

            <span
                className={`
                    text-xs font-semibold
                    ${
                        completed
                            ? "text-blue-600"
                            : "text-slate-400"
                    }
                `}
            >
                {completed
                    ? "Complete"
                    : "Pending"}
            </span>
        </div>
    );
};

/* ================================================================ */
/* RECENT JOB */
/* ================================================================ */

const RecentJob = ({
    job,
    onClick,
}) => {
    const matchScore = Number(
        job?.overallMatch ?? 0
    );

    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex w-full min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left transition-all duration-200 hover:border-blue-100 hover:bg-blue-50"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 transition-colors group-hover:bg-white">
                <BriefcaseBusiness
                    size={17}
                    className="text-blue-600"
                />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-5 text-blue-950">
                    {job?.jobTitle ||
                        "Job Match"}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                    {job?.companyName ||
                        "Company"}
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                <div className="hidden text-right sm:block">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Match
                    </p>

                    <p className="text-sm font-bold text-blue-600">
                        {matchScore}%
                    </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <ArrowRight
                        size={15}
                        className="text-blue-500 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                </div>
            </div>
        </button>
    );
};

/* ================================================================ */
/* EMPTY STATE */
/* ================================================================ */

const EmptyState = ({
    icon: Icon,
    title,
    description,
    action,
    onClick,
}) => {
    return (
        <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-7 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                <Icon
                    size={22}
                    className="text-blue-600"
                />
            </div>

            <h3 className="mt-3 text-sm font-bold text-blue-950">
                {title}
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
                {description}
            </p>

            {action && onClick && (
                <button
                    type="button"
                    onClick={onClick}
                    className="group mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                    {action}

                    <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                    />
                </button>
            )}
        </div>
    );
};

/* ================================================================ */
/* READINESS RING */
/* ================================================================ */

const ReadinessRing = ({
    value,
}) => {
    const safeValue = Math.min(
        Math.max(Number(value) || 0, 0),
        100
    );

    const radius = 42;

    const circumference =
        2 * Math.PI * radius;

    const dashOffset =
        circumference -
        (safeValue / 100) *
            circumference;

    return (
        <div className="flex shrink-0 items-center justify-center">
            <div className="relative flex h-32 w-32 items-center justify-center">
                <svg
                    width="128"
                    height="128"
                    viewBox="0 0 128 128"
                    className="-rotate-90"
                >
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="none"
                        stroke="white"
                        strokeWidth="10"
                    />

                    <motion.circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{
                            strokeDashoffset:
                                circumference,
                        }}
                        animate={{
                            strokeDashoffset:
                                dashOffset,
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 0.25,
                        }}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-blue-950">
                        {safeValue}%
                    </span>

                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Ready
                    </span>
                </div>
            </div>
        </div>
    );
};

/* ================================================================ */
/* DASHBOARD SKELETON */
/* ================================================================ */

const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen w-full bg-white">
            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
                <div className="animate-pulse">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-blue-50" />
                            <div className="h-3 w-44 rounded-full bg-slate-100" />
                        </div>

                        <div className="mt-4 h-8 w-72 max-w-full rounded-lg bg-slate-100" />

                        <div className="mt-3 h-4 w-full max-w-2xl rounded-full bg-slate-100" />

                        <div className="mt-5 flex gap-3">
                            <div className="h-10 w-24 rounded-xl bg-slate-100" />
                            <div className="h-10 w-32 rounded-xl bg-blue-50" />
                        </div>
                    </div>

                    {/* Career Readiness */}
                    <div className="mb-8 rounded-2xl border border-blue-50 bg-blue-50/40 p-6">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-3">
                                    <div className="h-11 w-11 shrink-0 rounded-xl bg-white" />

                                    <div className="space-y-2">
                                        <div className="h-3 w-28 rounded-full bg-blue-100" />
                                        <div className="h-5 w-64 max-w-full rounded-lg bg-blue-100/70" />
                                    </div>
                                </div>

                                <div className="mt-5 h-4 w-full max-w-2xl rounded-full bg-white" />

                                <div className="mt-5 h-2 w-full rounded-full bg-white" />

                                <div className="mt-3 flex gap-5">
                                    <div className="h-3 w-20 rounded-full bg-white" />
                                    <div className="h-3 w-20 rounded-full bg-white" />
                                    <div className="h-3 w-24 rounded-full bg-white" />
                                </div>
                            </div>

                            <div className="mx-auto h-32 w-32 shrink-0 rounded-full border-[10px] border-white bg-blue-50 lg:mx-0" />
                        </div>
                    </div>

                    {/* Career Overview */}
                    <div className="mb-8">
                        <div className="mb-4">
                            <div className="h-5 w-36 rounded-lg bg-slate-100" />
                            <div className="mt-2 h-3 w-64 rounded-full bg-slate-100" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-32 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-white" />

                                    <div className="mt-4 h-3 w-20 rounded-full bg-slate-100" />

                                    <div className="mt-2 h-6 w-16 rounded-lg bg-slate-100" />

                                    <div className="mt-2 h-3 w-28 rounded-full bg-slate-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">

                        {/* Left */}
                        <div className="min-w-0 space-y-8">

                            {/* Resume Intelligence */}
                            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-50" />

                                        <div className="space-y-2">
                                            <div className="h-4 w-40 rounded-lg bg-slate-100" />
                                            <div className="h-3 w-64 max-w-full rounded-full bg-slate-100" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="h-24 rounded-xl border border-slate-100 bg-slate-50"
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-6 h-16 rounded-xl bg-slate-50" />
                                </div>
                            </div>

                            {/* Job Search Intelligence */}
                            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-50" />

                                        <div className="space-y-2">
                                            <div className="h-4 w-44 rounded-lg bg-slate-100" />
                                            <div className="h-3 w-72 max-w-full rounded-full bg-slate-100" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="h-24 rounded-xl border border-slate-100 bg-slate-50"
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="h-14 rounded-xl bg-slate-50"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="min-w-0 space-y-6">

                            {/* Career Workspace */}
                            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-50" />

                                        <div className="space-y-2">
                                            <div className="h-4 w-36 rounded-lg bg-slate-100" />
                                            <div className="h-3 w-56 max-w-full rounded-full bg-slate-100" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 p-4">
                                    {Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex h-16 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                                        >
                                            <div className="h-10 w-10 shrink-0 rounded-lg bg-white" />

                                            <div className="min-w-0 flex-1 space-y-2">
                                                <div className="h-3 w-32 rounded-full bg-slate-100" />
                                                <div className="h-3 w-44 max-w-full rounded-full bg-slate-100" />
                                            </div>

                                            <div className="h-8 w-8 shrink-0 rounded-lg bg-white" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI Insight */}
                            <div className="rounded-2xl border border-blue-50 bg-blue-50/40 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-white" />

                                    <div className="space-y-2">
                                        <div className="h-3 w-20 rounded-full bg-blue-100" />
                                        <div className="h-4 w-40 rounded-lg bg-blue-100/70" />
                                    </div>
                                </div>

                                <div className="mt-5 h-4 w-full rounded-full bg-white" />
                                <div className="mt-2 h-4 w-4/5 rounded-full bg-white" />

                                <div className="mt-5 space-y-2">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="h-12 rounded-xl border border-blue-50 bg-white/80"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Profile Setup */}
                            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-blue-50" />

                                    <div className="space-y-2">
                                        <div className="h-4 w-32 rounded-lg bg-slate-100" />
                                        <div className="h-3 w-48 max-w-full rounded-full bg-slate-100" />
                                    </div>
                                </div>

                                <div className="mt-5 space-y-3">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="h-14 rounded-xl bg-slate-50"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;