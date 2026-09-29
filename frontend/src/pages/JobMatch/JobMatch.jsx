import { useEffect, useState } from "react";
import {
    Briefcase,
    Building2,
    CheckCircle2,
    ChevronDown,
    Clock3,
    FileText,
    Lightbulb,
    Loader2,
    MessageSquare,
    Search,
    Sparkles,
    Target,
    Trash2,
    TrendingUp,
    XCircle,
} from "lucide-react";

import {
    analyzeJob,
    getJobHistory,
    updateJobStatus,
    deleteJob,
} from "../../api/jobApi";

const JobMatch = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        jobTitle: "",
        jobDescription: "",
    });

    const [loading, setLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(true);

    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [expandedJob, setExpandedJob] = useState(null);

    // ============================================================
    // Load Job History
    // ============================================================

    const loadHistory = async () => {
        try {
            setHistoryLoading(true);

            const response = await getJobHistory();

            setHistory(response.data.data?.jobs || []);
        } catch (err) {
            console.error("Failed to load job history:", err);
            setHistory([]);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    // ============================================================
    // Handle Input
    // ============================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    // ============================================================
    // Analyze Job
    // ============================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setResult(null);

        if (
            !formData.companyName.trim() ||
            !formData.jobTitle.trim() ||
            !formData.jobDescription.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await analyzeJob({
                companyName: formData.companyName.trim(),
                jobTitle: formData.jobTitle.trim(),
                jobDescription: formData.jobDescription.trim(),
            });

            const job = response.data.data;

            setResult(job);

            setSuccess("Job match analyzed successfully.");

            await loadHistory();
        } catch (err) {
            console.error("Job analysis failed:", err);

            setError(
                err.response?.data?.message ||
                    "Failed to analyze this job. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // Update Status
    // ============================================================

    const handleStatusChange = async (jobId, status) => {
        try {
            await updateJobStatus(jobId, { status });

            if (result?._id === jobId) {
                setResult((prev) => ({
                    ...prev,
                    status,
                }));
            }

            await loadHistory();
        } catch (err) {
            console.error("Status update failed:", err);

            setError(
                err.response?.data?.message ||
                    "Failed to update job status."
            );
        }
    };

    // ============================================================
    // Delete Job
    // ============================================================

    const handleDelete = async (jobId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this job analysis?"
        );

        if (!confirmed) return;

        try {
            await deleteJob(jobId);

            if (result?._id === jobId) {
                setResult(null);
            }

            await loadHistory();

            setSuccess("Job analysis deleted successfully.");
        } catch (err) {
            console.error("Delete failed:", err);

            setError(
                err.response?.data?.message ||
                    "Failed to delete job analysis."
            );
        }
    };

    // ============================================================
    // Helpers
    // ============================================================

    const getScoreLabel = (score) => {
        if (score >= 80) return "Strong Match";
        if (score >= 60) return "Good Match";
        if (score >= 40) return "Partial Match";

        return "Low Match";
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case "High":
                return "bg-red-50 text-red-700 border-red-200";

            case "Medium":
                return "bg-yellow-50 text-yellow-700 border-yellow-200";

            case "Low":
                return "bg-green-50 text-green-700 border-green-200";

            default:
                return "bg-slate-50 text-slate-600 border-slate-200";
        }
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-8">

            {/* =====================================================
                HEADER
            ====================================================== */}

            <div>
                <div className="mb-2 flex items-center gap-2 text-blue-600">
                    <Sparkles size={20} />

                    <span className="font-semibold">
                        AI Career Assistant
                    </span>
                </div>

                <h1 className="text-3xl font-bold text-slate-900">
                    Job Match Analyzer
                </h1>

                <p className="mt-2 max-w-3xl text-slate-600">
                    Compare your resume with a job description and discover
                    your match score, missing skills, ATS keywords, and
                    interview focus areas.
                </p>
            </div>

            {/* =====================================================
                ALERTS
            ====================================================== */}

            {error && (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                    <XCircle size={20} className="shrink-0" />

                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                    <CheckCircle2 size={20} className="shrink-0" />

                    <span>{success}</span>
                </div>
            )}

            {/* =====================================================
                ANALYZE FORM
            ====================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Search size={22} />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-xl font-bold text-slate-900">
                            Analyze a Job
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter the details of the role you're targeting.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Company Name */}

                    <div>
                        <label
                            htmlFor="companyName"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Company Name
                        </label>

                        <div className="relative">
                            <Building2
                                size={18}
                                strokeWidth={2}
                                className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                id="companyName"
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="e.g. Google"
                                autoComplete="organization"
                                style={{
                                    paddingLeft: "48px",
                                    paddingRight: "16px",
                                }}
                                className="box-border w-full rounded-xl border border-slate-200 bg-white py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>
                    </div>

                    {/* Job Title */}

                    <div>
                        <label
                            htmlFor="jobTitle"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Job Title
                        </label>

                        <div className="relative">
                            <Briefcase
                                size={18}
                                strokeWidth={2}
                                className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                id="jobTitle"
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                placeholder="e.g. Software Engineer"
                                autoComplete="off"
                                style={{
                                    paddingLeft: "48px",
                                    paddingRight: "16px",
                                }}
                                className="box-border w-full rounded-xl border border-slate-200 bg-white py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>
                    </div>

                    {/* Job Description */}

                    <div>
                        <label
                            htmlFor="jobDescription"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Job Description
                        </label>

                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            rows={10}
                            placeholder="Paste the complete job description here..."
                            className="box-border w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            Include responsibilities, requirements,
                            technologies, and qualifications.
                        </p>
                    </div>

                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={19}
                                    className="animate-spin"
                                />

                                Analyzing Job...
                            </>
                        ) : (
                            <>
                                <Sparkles size={19} />

                                Analyze Job Match
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* =====================================================
                ANALYSIS RESULT
            ====================================================== */}

            {result && (
                <div className="space-y-6">

                    {/* Match Score */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

                            <div className="min-w-0">
                                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                                    Job Match Result
                                </p>

                                <h2 className="mt-1 truncate text-2xl font-bold text-slate-900">
                                    {result.companyName}
                                </h2>

                                <p className="mt-1 text-slate-600">
                                    {result.jobTitle}
                                </p>
                            </div>

                            <div className="shrink-0 text-center">
                                <div className="text-5xl font-bold text-blue-600">
                                    {result.overallMatch}%
                                </div>

                                <p className="mt-1 font-semibold text-slate-700">
                                    {getScoreLabel(result.overallMatch)}
                                </p>
                            </div>
                        </div>

                        {/* Status */}

                        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
                            <span className="text-sm font-semibold text-slate-600">
                                Application Status:
                            </span>

                            <select
                                value={result.status || "Analyzed"}
                                onChange={(e) =>
                                    handleStatusChange(
                                        result._id,
                                        e.target.value
                                    )
                                }
                                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="Analyzed">
                                    Analyzed
                                </option>

                                <option value="Applied">
                                    Applied
                                </option>

                                <option value="Interview">
                                    Interview
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>

                                <option value="Offer">
                                    Offer
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Matched Skills */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                <CheckCircle2 size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Matched Skills
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Skills already present in your resume.
                                </p>
                            </div>
                        </div>

                        {result.matchedSkills?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {result.matchedSkills.map(
                                    (skill, index) => (
                                        <span
                                            key={`${skill}-${index}`}
                                            className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700"
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">
                                No matched skills found.
                            </p>
                        )}
                    </div>

                    {/* Missing Skills */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <Target size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Missing Skills
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Skills that may improve your job alignment.
                                </p>
                            </div>
                        </div>

                        {result.missingSkills?.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                {result.missingSkills.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-slate-200 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="min-w-0 font-semibold text-slate-900">
                                                    {item.title}
                                                </h3>

                                                <span
                                                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getPriorityClass(
                                                        item.priority
                                                    )}`}
                                                >
                                                    {item.priority}
                                                </span>
                                            </div>

                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                {item.reason}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">
                                No missing skills identified.
                            </p>
                        )}
                    </div>

                    {/* ATS Keywords */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                <FileText size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    ATS Keyword Suggestions
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Keywords identified from the job description.
                                </p>
                            </div>
                        </div>

                        {result.keywordSuggestions?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {result.keywordSuggestions.map(
                                    (keyword, index) => (
                                        <span
                                            key={`${keyword}-${index}`}
                                            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                                        >
                                            {keyword}
                                        </span>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">
                                No additional keyword suggestions.
                            </p>
                        )}
                    </div>

                    {/* Strengths */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <TrendingUp size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Resume Strengths
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Strengths identified for this particular role.
                                </p>
                            </div>
                        </div>

                        {result.strengths?.length > 0 ? (
                            <div className="space-y-3">
                                {result.strengths.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-slate-200 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="min-w-0 font-semibold text-slate-900">
                                                    {item.title}
                                                </h3>

                                                <span
                                                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getPriorityClass(
                                                        item.priority
                                                    )}`}
                                                >
                                                    {item.priority}
                                                </span>
                                            </div>

                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                {item.reason}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">
                                No specific strengths identified.
                            </p>
                        )}
                    </div>

                    {/* Improvement Suggestions */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <Lightbulb size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Improvement Suggestions
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Actionable recommendations based on the job.
                                </p>
                            </div>
                        </div>

                        {result.improvementSuggestions?.length > 0 ? (
                            <div className="space-y-3">
                                {result.improvementSuggestions.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-slate-200 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="min-w-0 font-semibold text-slate-900">
                                                    {item.title}
                                                </h3>

                                                <span
                                                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getPriorityClass(
                                                        item.priority
                                                    )}`}
                                                >
                                                    {item.priority}
                                                </span>
                                            </div>

                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                {item.reason}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">
                                No improvement suggestions.
                            </p>
                        )}
                    </div>

                    {/* Interview Focus */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <MessageSquare size={21} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Interview Preparation
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Topics you should prepare for this role.
                                </p>
                            </div>
                        </div>

                        {result.interviewFocus?.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {result.interviewFocus.map(
                                    (topic, index) => (
                                        <div
                                            key={`${topic}-${index}`}
                                            className="flex items-center gap-3 rounded-xl bg-blue-50 p-4"
                                        >
                                            <Clock3
                                                size={18}
                                                className="shrink-0 text-blue-600"
                                            />

                                            <span className="text-sm font-semibold text-blue-900">
                                                {topic}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">
                                No interview topics identified.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* =====================================================
                JOB HISTORY
            ====================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <h2 className="text-xl font-bold text-slate-900">
                            Job Match History
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Your previous job analyses.
                        </p>
                    </div>

                    <Briefcase
                        size={24}
                        className="shrink-0 text-slate-400"
                    />
                </div>

                {historyLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2
                            size={28}
                            className="animate-spin text-blue-600"
                        />
                    </div>
                ) : history.length === 0 ? (
                    <div className="py-10 text-center">
                        <FileText
                            size={40}
                            className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 font-medium text-slate-600">
                            No job analyses yet.
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Analyze your first job above.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {history.map((job) => {
                            const isExpanded =
                                expandedJob === job._id;

                            return (
                                <div
                                    key={job._id}
                                    className="overflow-hidden rounded-xl border border-slate-200"
                                >
                                    <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">

                                        <div className="flex min-w-0 items-center gap-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                <Building2 size={20} />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="truncate font-semibold text-slate-900">
                                                    {job.companyName}
                                                </h3>

                                                <p className="truncate text-sm text-slate-500">
                                                    {job.jobTitle}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    {formatDate(job.createdAt)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">

                                            <div className="text-center">
                                                <div className="font-bold text-blue-600">
                                                    {job.overallMatch}%
                                                </div>

                                                <div className="text-xs text-slate-400">
                                                    Match
                                                </div>
                                            </div>

                                            <select
                                                value={
                                                    job.status ||
                                                    "Analyzed"
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        job._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm outline-none focus:border-blue-500"
                                            >
                                                <option value="Analyzed">
                                                    Analyzed
                                                </option>

                                                <option value="Applied">
                                                    Applied
                                                </option>

                                                <option value="Interview">
                                                    Interview
                                                </option>

                                                <option value="Rejected">
                                                    Rejected
                                                </option>

                                                <option value="Offer">
                                                    Offer
                                                </option>
                                            </select>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setExpandedJob(
                                                        isExpanded
                                                            ? null
                                                            : job._id
                                                    )
                                                }
                                                aria-label={
                                                    isExpanded
                                                        ? "Collapse job details"
                                                        : "Expand job details"
                                                }
                                                className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
                                            >
                                                <ChevronDown
                                                    size={18}
                                                    className={
                                                        isExpanded
                                                            ? "rotate-180 transition-transform"
                                                            : "transition-transform"
                                                    }
                                                />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        job._id
                                                    )
                                                }
                                                aria-label="Delete job analysis"
                                                className="rounded-lg border border-red-200 p-2 text-red-500 transition hover:bg-red-50"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded History Details */}

                                    {isExpanded && (
                                        <div className="border-t border-slate-100 bg-slate-50 p-5">

                                            <div className="grid gap-5 md:grid-cols-2">

                                                <div>
                                                    <h4 className="mb-2 text-sm font-bold text-slate-700">
                                                        Matched Skills
                                                    </h4>

                                                    <div className="flex flex-wrap gap-2">
                                                        {(
                                                            job.matchedSkills ||
                                                            []
                                                        ).map(
                                                            (
                                                                skill,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        index
                                                                    }
                                                                    className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="mb-2 text-sm font-bold text-slate-700">
                                                        Interview Focus
                                                    </h4>

                                                    <div className="flex flex-wrap gap-2">
                                                        {(
                                                            job.interviewFocus ||
                                                            []
                                                        ).map(
                                                            (
                                                                topic,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        index
                                                                    }
                                                                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                                                                >
                                                                    {topic}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobMatch;