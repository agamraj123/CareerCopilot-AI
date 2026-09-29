import { useEffect, useMemo, useState } from "react";
import {
    Brain,
    ChevronDown,
    ChevronUp,
    Loader2,
    Trash2,
    RefreshCw,
    Sparkles,
    Briefcase,
    Building2,
    FileText,
    Target,
    CheckCircle2,
    Clock3,
    X,
    MessageSquare,
    Code2,
    Users,
    Layers3,
} from "lucide-react";

import {
    generateInterview,
    getInterviewHistory,
    deleteInterview,
} from "../../api/interviewApi";

const Interview = () => {
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const [questions, setQuestions] = useState([]);
    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(true);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [expandedQuestion, setExpandedQuestion] = useState(null);

    // ==========================================
    // Fetch History
    // ==========================================

    const fetchHistory = async () => {
        try {
            setHistoryLoading(true);

            const response = await getInterviewHistory();

            setHistory(response.data.data || []);
        } catch (error) {
            console.error(
                "Failed to fetch interview history:",
                error
            );
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // ==========================================
    // Generate Interview
    // ==========================================

    const handleGenerate = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setExpandedQuestion(null);

        if (!companyName.trim()) {
            setError("Please enter the company name.");
            return;
        }

        if (!jobTitle.trim()) {
            setError("Please enter the target job title.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please enter the job description.");
            return;
        }

        try {
            setLoading(true);

            const response = await generateInterview({
                companyName,
                jobTitle,
                jobDescription,
            });

            const interview = response.data.data;

            setQuestions(interview.questions || []);

            setSuccess(
                "Interview preparation generated successfully."
            );

            await fetchHistory();

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (error) {
            console.error(
                "Interview generation error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Failed to generate interview preparation."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // Delete History
    // ==========================================

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Delete this interview preparation?"
        );

        if (!confirmed) return;

        try {
            await deleteInterview(id);

            setHistory((prev) =>
                prev.filter((item) => item._id !== id)
            );
        } catch (error) {
            console.error(
                "Failed to delete interview:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Unable to delete interview preparation."
            );
        }
    };

    // ==========================================
    // Toggle Question
    // ==========================================

    const toggleQuestion = (index) => {
        setExpandedQuestion(
            expandedQuestion === index ? null : index
        );
    };

    // ==========================================
    // Clear Questions
    // ==========================================

    const clearQuestions = () => {
        setQuestions([]);
        setExpandedQuestion(null);
        setSuccess("");
    };

    // ==========================================
    // Question Statistics
    // ==========================================

    const statistics = useMemo(() => {
        const technical = questions.filter(
            (item) => item.category === "Technical"
        ).length;

        const dsa = questions.filter(
            (item) => item.category === "DSA"
        ).length;

        const coreCS = questions.filter(
            (item) => item.category === "Core CS"
        ).length;

        const project = questions.filter(
            (item) => item.category === "Project"
        ).length;

        const hr = questions.filter(
            (item) => item.category === "HR"
        ).length;

        const roleSpecific = questions.filter(
            (item) => item.category === "Role Specific"
        ).length;

        return {
            total: questions.length,
            technical,
            dsa,
            coreCS,
            project,
            hr,
            roleSpecific,
        };
    }, [questions]);

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 pb-10 sm:space-y-8">
            {/* ==========================================
                Header
            ========================================== */}

            <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-50 blur-2xl" />

                <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-blue-50/70 blur-3xl" />

                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 shadow-sm shadow-blue-200 sm:h-14 sm:w-14">
                            <Brain className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                        </div>

                        <div>
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                                    AI Powered
                                </span>

                                {questions.length > 0 && (
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                                        Preparation Ready
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                Interview Intelligence
                            </h1>

                            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                Prepare for interviews with AI-generated
                                questions based on your target role and
                                job description.
                            </p>
                        </div>
                    </div>

                    {questions.length > 0 && (
                        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 lg:flex">
                            <div className="rounded-xl bg-blue-100 p-2">
                                <MessageSquare className="h-5 w-5 text-blue-600" />
                            </div>

                            <div>
                                <p className="text-xs font-medium text-slate-500">
                                    Questions Generated
                                </p>

                                <p className="text-lg font-bold text-slate-900">
                                    {questions.length}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ==========================================
                Alerts
            ========================================== */}

            {error && (
                <AlertMessage
                    type="error"
                    message={error}
                    onClose={() => setError("")}
                />
            )}

            {success && (
                <AlertMessage
                    type="success"
                    message={success}
                    onClose={() => setSuccess("")}
                />
            )}

            {/* ==========================================
                Generator
            ========================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                    <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-blue-50 p-2.5">
                            <Sparkles className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Generate Interview Preparation
                            </h2>

                            <p className="mt-1 text-sm leading-5 text-slate-500">
                                Tell CareerCopilot what role you are
                                targeting and we'll generate a focused
                                preparation set.
                            </p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleGenerate}
                    className="space-y-5 p-5 sm:p-7"
                >
                    <div className="grid gap-5 lg:grid-cols-2">
                        {/* Company */}

                        <FormField
                            icon={Building2}
                            label="Company"
                            value={companyName}
                            onChange={setCompanyName}
                            placeholder="e.g. Google"
                        />

                        {/* Job Title */}

                        <FormField
                            icon={Briefcase}
                            label="Job Title"
                            value={jobTitle}
                            onChange={setJobTitle}
                            placeholder="e.g. Software Engineer"
                        />
                    </div>

                    {/* Job Description */}

                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <FileText className="h-4 w-4 text-blue-600" />
                            Job Description
                        </label>

                        <textarea
                            value={jobDescription}
                            onChange={(e) =>
                                setJobDescription(e.target.value)
                            }
                            rows={8}
                            placeholder="Paste the complete job description here..."
                            className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                        />

                        <p className="mt-2 text-xs text-slate-400">
                            The more complete the job description, the
                            more targeted your interview preparation can
                            be.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Target className="h-4 w-4 text-blue-600" />
                            <span>
                                AI generates questions across technical,
                                DSA, core CS, projects and HR topics.
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Brain className="h-4 w-4" />
                                    Generate Preparation
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </section>

            {/* ==========================================
                Generated Questions
            ========================================== */}

            {questions.length > 0 && (
                <section className="space-y-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-1 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-blue-600" />

                                <span className="text-sm font-semibold text-blue-600">
                                    Preparation Generated
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                                Your Interview Questions
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {questions.length} questions generated
                                from your target role.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={clearQuestions}
                            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Clear
                        </button>
                    </div>

                    {/* Statistics */}

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        <QuestionStat
                            icon={MessageSquare}
                            label="Total"
                            value={statistics.total}
                        />

                        <QuestionStat
                            icon={Code2}
                            label="Technical"
                            value={statistics.technical}
                        />

                        <QuestionStat
                            icon={Layers3}
                            label="DSA"
                            value={statistics.dsa}
                        />

                        <QuestionStat
                            icon={Brain}
                            label="Core CS"
                            value={statistics.coreCS}
                        />

                        <QuestionStat
                            icon={Briefcase}
                            label="Project"
                            value={statistics.project}
                        />

                        <QuestionStat
                            icon={Users}
                            label="HR"
                            value={statistics.hr}
                        />
                    </div>

                    {/* Questions */}

                    <div className="space-y-3">
                        {questions.map((item, index) => {
                            const isExpanded =
                                expandedQuestion === index;

                            return (
                                <QuestionCard
                                    key={`${item.question}-${index}`}
                                    item={item}
                                    index={index}
                                    expanded={isExpanded}
                                    onToggle={() =>
                                        toggleQuestion(index)
                                    }
                                />
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ==========================================
                History
            ========================================== */}

            <section className="space-y-4">
                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        Your Workspace
                    </p>

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                        Previous Preparations
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Revisit your previous interview preparation
                        sessions.
                    </p>
                </div>

                {historyLoading ? (
                    <HistorySkeleton />
                ) : history.length === 0 ? (
                    <EmptyHistory />
                ) : (
                    <div className="grid gap-3">
                        {history.map((item) => (
                            <HistoryCard
                                key={item._id}
                                item={item}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

// ============================================================
// Form Field
// ============================================================

const FormField = ({
    icon: Icon,
    label,
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Icon className="h-4 w-4 text-blue-600" />
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
        </div>
    );
};

// ============================================================
// Question Stat
// ============================================================

const QuestionStat = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-slate-500">
                    {label}
                </p>

                <Icon className="h-4 w-4 text-blue-500" />
            </div>

            <p className="mt-2 text-2xl font-bold text-slate-900">
                {value}
            </p>
        </div>
    );
};

// ============================================================
// Question Card
// ============================================================

const QuestionCard = ({
    item,
    index,
    expanded,
    onToggle,
}) => {
    const difficultyStyle = {
        Easy: "bg-emerald-50 text-emerald-700",
        Medium: "bg-blue-50 text-blue-700",
        Hard: "bg-red-50 text-red-700",
    };

    const categoryStyle = {
        Technical: "bg-blue-50 text-blue-700",
        DSA: "bg-blue-50 text-blue-700",
        "Core CS": "bg-slate-100 text-slate-700",
        Project: "bg-blue-50 text-blue-700",
        HR: "bg-slate-100 text-slate-700",
        "Role Specific": "bg-blue-50 text-blue-700",
    };

    return (
        <div
            className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
                expanded
                    ? "border-blue-200"
                    : "border-slate-200 hover:border-blue-100"
            }`}
        >
            <button
                type="button"
                onClick={onToggle}
                className="w-full p-4 text-left sm:p-5"
            >
                <div className="flex items-start gap-3 sm:gap-4">
                    <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                            expanded
                                ? "bg-blue-600 text-white"
                                : "bg-blue-50 text-blue-700"
                        }`}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            {item.category && (
                                <span
                                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                        categoryStyle[item.category] ||
                                        "bg-slate-100 text-slate-700"
                                    }`}
                                >
                                    {item.category}
                                </span>
                            )}

                            {item.difficulty && (
                                <span
                                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                        difficultyStyle[
                                            item.difficulty
                                        ] ||
                                        "bg-slate-100 text-slate-700"
                                    }`}
                                >
                                    {item.difficulty}
                                </span>
                            )}
                        </div>

                        <h3 className="break-words text-sm font-semibold leading-6 text-slate-900 sm:text-base">
                            {item.question}
                        </h3>

                        {item.topic && (
                            <p className="mt-1.5 text-xs text-slate-500">
                                Topic: {item.topic}
                            </p>
                        )}
                    </div>

                    <div className="shrink-0 rounded-lg bg-slate-50 p-1.5">
                        {expanded ? (
                            <ChevronUp className="h-4 w-4 text-blue-600" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-slate-500" />
                        )}
                    </div>
                </div>
            </button>

            {expanded && (
                <div className="border-t border-blue-100 bg-blue-50/30 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                Answer Guidance
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {item.answerGuidance ||
                                    "No specific guidance provided."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================
// History Card
// ============================================================

const HistoryCard = ({
    item,
    onDelete,
}) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-100 sm:p-5">
            <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-slate-900">
                        {item.companyName ||
                            "General Interview"}
                    </h3>

                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                        <span>
                            {item.jobTitle ||
                                "Software Engineer"}
                        </span>

                        <span className="hidden sm:inline">
                            •
                        </span>

                        <span>
                            {item.questions?.length || 0}{" "}
                            questions
                        </span>

                        {item.createdAt && (
                            <>
                                <span className="hidden sm:inline">
                                    •
                                </span>

                                <span className="flex items-center gap-1">
                                    <Clock3 className="h-3 w-3" />
                                    {new Date(
                                        item.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </>
                        )}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        onDelete(item._id)
                    }
                    className="shrink-0 rounded-xl p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    title="Delete preparation"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

// ============================================================
// Alert
// ============================================================

const AlertMessage = ({
    type,
    message,
    onClose,
}) => {
    const isSuccess = type === "success";

    return (
        <div
            className={`flex items-start gap-3 rounded-2xl border p-4 ${
                isSuccess
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-700"
            }`}
        >
            {isSuccess ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                    !
                </div>
            )}

            <p className="flex-1 text-sm font-medium leading-6">
                {message}
            </p>

            <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 transition hover:bg-black/5"
                aria-label="Close"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

// ============================================================
// Empty History
// ============================================================

const EmptyHistory = () => {
    return (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <Brain className="h-6 w-6 text-blue-600" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
                No interview preparations yet
            </h3>

            <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-slate-500">
                Generate your first preparation set above and your
                previous sessions will appear here.
            </p>
        </div>
    );
};

// ============================================================
// History Skeleton
// ============================================================

const HistorySkeleton = () => {
    return (
        <div className="space-y-3">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="h-20 animate-pulse rounded-2xl bg-slate-100"
                />
            ))}
        </div>
    );
};

export default Interview;