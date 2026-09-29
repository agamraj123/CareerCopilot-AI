import { useEffect, useRef, useState } from "react";
import {
    Upload,
    FileText,
    RefreshCw,
    Trash2,
    CheckCircle2,
    AlertCircle,
    Target,
    Code2,
    Users,
    TrendingUp,
    AlertTriangle,
    Briefcase,
    BookOpen,
    MessageSquare,
    Sparkles,
    ArrowUpRight,
    Brain,
    ShieldCheck,
    Clock3,
    X,
} from "lucide-react";

import {
    uploadResume,
    getResume,
    reanalyzeResume,
    deleteResume,
} from "../../api/resumeApi";

const Resume = () => {
    const fileInputRef = useRef(null);

    const [resume, setResume] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [reanalyzing, setReanalyzing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ==========================================
    // Fetch Existing Resume
    // ==========================================

    const fetchResume = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getResume();

            setResume(response.data.data);
        } catch (error) {
            // 404 simply means the user has not uploaded a resume yet.
            if (error.response?.status !== 404) {
                setError(
                    error.response?.data?.message ||
                        "Unable to fetch your resume."
                );
            }

            setResume(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResume();
    }, []);

    // ==========================================
    // File Selection
    // ==========================================

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        setError("");
        setSuccess("");

        if (!file) {
            setSelectedFile(null);
            return;
        }

        if (file.type !== "application/pdf") {
            setError("Please select a PDF resume.");
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
    };

    // ==========================================
    // Upload Resume
    // ==========================================

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a PDF resume first.");
            return;
        }

        try {
            setUploading(true);
            setError("");
            setSuccess("");

            const formData = new FormData();

            formData.append("resume", selectedFile);

            const response = await uploadResume(formData);

            setResume(response.data.data);
            setSelectedFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setSuccess(
                response.data.message ||
                    "Resume uploaded and analyzed successfully."
            );
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Resume upload failed."
            );
        } finally {
            setUploading(false);
        }
    };

    // ==========================================
    // Reanalyze Resume
    // ==========================================

    const handleReanalyze = async () => {
        try {
            setReanalyzing(true);
            setError("");
            setSuccess("");

            const response = await reanalyzeResume();

            setResume(response.data.data);

            setSuccess(
                response.data.message ||
                    "Resume reanalyzed successfully."
            );
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Resume reanalysis failed."
            );
        } finally {
            setReanalyzing(false);
        }
    };

    // ==========================================
    // Delete Resume
    // ==========================================

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your resume?"
        );

        if (!confirmed) return;

        try {
            setDeleting(true);
            setError("");
            setSuccess("");

            await deleteResume();

            setResume(null);
            setSuccess("Resume deleted successfully.");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Unable to delete resume."
            );
        } finally {
            setDeleting(false);
        }
    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {
        return <ResumeLoading />;
    }

    const analysis = resume?.aiAnalysis;

    // ==========================================
    // Main UI
    // ==========================================

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 pb-10 sm:space-y-8">
            {/* ==========================================
                Page Header
            ========================================== */}

            <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-50 blur-2xl" />
                <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-blue-50/70 blur-3xl" />

                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 shadow-sm shadow-blue-200 sm:h-14 sm:w-14">
                            <Sparkles className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                        </div>

                        <div>
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                                    AI Powered
                                </span>

                                {resume && (
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                                        Resume Active
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                Resume Intelligence
                            </h1>

                            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                Analyze your resume with AI and discover
                                actionable insights for your career.
                            </p>
                        </div>
                    </div>

                    {resume && (
                        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 lg:flex">
                            <Brain className="h-4 w-4 text-blue-600" />

                            <div>
                                <p className="text-xs font-medium text-slate-500">
                                    AI Analysis
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                    Ready
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
                Upload Section
            ========================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                    <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-blue-50 p-2.5">
                            <Upload className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Upload Your Resume
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Upload a PDF and let CareerCopilot analyze
                                your professional profile.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-5 sm:p-7">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {!selectedFile ? (
                        <button
                            type="button"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-5 py-10 text-center transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/50 sm:py-12"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 transition-transform duration-200 group-hover:scale-105">
                                <Upload className="h-6 w-6 text-blue-600" />
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-slate-800">
                                Choose your resume
                            </h3>

                            <p className="mt-1 max-w-md text-sm text-slate-500">
                                Select a PDF resume from your device.
                            </p>

                            <span className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                                Choose PDF
                            </span>

                            <p className="mt-3 text-xs text-slate-400">
                                PDF files only
                            </p>
                        </button>
                    ) : (
                        <SelectedFileCard
                            file={selectedFile}
                            uploading={uploading}
                            onUpload={handleUpload}
                            onRemove={() => {
                                setSelectedFile(null);

                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }}
                        />
                    )}
                </div>
            </section>

            {/* ==========================================
                No Resume
            ========================================== */}

            {!resume && (
                <EmptyResumeState
                    onUpload={() =>
                        fileInputRef.current?.click()
                    }
                />
            )}

            {/* ==========================================
                Existing Resume
            ========================================== */}

            {resume && (
                <>
                    {/* Resume File */}
                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex min-w-0 items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
                                    <FileText className="h-6 w-6 text-blue-600" />
                                </div>

                                <div className="min-w-0">
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                                        Current Resume
                                    </p>

                                    <h2
                                        className="truncate text-base font-semibold text-slate-900 sm:text-lg"
                                        title={resume.fileName}
                                    >
                                        {resume.fileName}
                                    </h2>

                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                        <Clock3 className="h-3.5 w-3.5" />

                                        Uploaded{" "}
                                        {resume.createdAt
                                            ? new Date(
                                                  resume.createdAt
                                              ).toLocaleDateString()
                                            : "Recently"}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                                <button
                                    type="button"
                                    onClick={handleReanalyze}
                                    disabled={
                                        reanalyzing || deleting
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <RefreshCw
                                        className={`h-4 w-4 ${
                                            reanalyzing
                                                ? "animate-spin"
                                                : ""
                                        }`}
                                    />

                                    <span>
                                        {reanalyzing
                                            ? "Analyzing..."
                                            : "Reanalyze"}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={
                                        deleting || reanalyzing
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Trash2 className="h-4 w-4" />

                                    <span>
                                        {deleting
                                            ? "Deleting..."
                                            : "Delete"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ==========================================
                        Analysis Unavailable
                    ========================================== */}

                    {!analysis && (
                        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl bg-amber-100 p-2.5">
                                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-amber-900">
                                        AI analysis unavailable
                                    </h2>

                                    <p className="mt-1 text-sm leading-6 text-amber-800">
                                        Your resume was uploaded, but AI
                                        analysis is currently unavailable.
                                        Try reanalyzing the resume.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {analysis && (
                        <>
                            {/* ==========================================
                                Overview / Score
                            ========================================== */}

                            <section className="grid gap-5 lg:grid-cols-3">
                                <ResumeScoreCard
                                    score={analysis.resumeScore}
                                />

                                <OverviewCard
                                    icon={Code2}
                                    title="Technical Skills"
                                    value={
                                        analysis.technicalSkills
                                            ?.length || 0
                                    }
                                    description="Skills detected from your resume"
                                />

                                <OverviewCard
                                    icon={Briefcase}
                                    title="Career Suggestions"
                                    value={
                                        analysis.careerSuggestions
                                            ?.length || 0
                                    }
                                    description="Potential career directions"
                                />
                            </section>

                            {/* ==========================================
                                Technical Skills
                            ========================================== */}

                            <InsightSection
                                icon={Code2}
                                title="Technical Skills"
                                description="Skills detected and evaluated from your resume."
                            >
                                {analysis.technicalSkills?.length ? (
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {analysis.technicalSkills.map(
                                            (skill, index) => (
                                                <SkillCard
                                                    key={`${skill.name}-${index}`}
                                                    skill={skill}
                                                />
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <EmptyInsight text="No technical skills were identified." />
                                )}
                            </InsightSection>

                            {/* ==========================================
                                Soft Skills
                            ========================================== */}

                            <InsightSection
                                icon={Users}
                                title="Soft Skills"
                                description="Professional and interpersonal strengths identified by AI."
                            >
                                {analysis.softSkills?.length ? (
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {analysis.softSkills.map(
                                            (skill, index) => (
                                                <SkillCard
                                                    key={`${skill.name}-${index}`}
                                                    skill={skill}
                                                />
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <EmptyInsight text="No soft skills were identified." />
                                )}
                            </InsightSection>

                            {/* ==========================================
                                Strengths + Weaknesses
                            ========================================== */}

                            <div className="grid gap-5 lg:grid-cols-2">
                                <InsightSection
                                    icon={CheckCircle2}
                                    title="Strengths"
                                    description="What your resume currently communicates well."
                                >
                                    <InsightList
                                        items={analysis.strengths}
                                        variant="success"
                                    />
                                </InsightSection>

                                <InsightSection
                                    icon={AlertTriangle}
                                    title="Weaknesses"
                                    description="Areas that may reduce the effectiveness of your resume."
                                >
                                    <InsightList
                                        items={analysis.weaknesses}
                                        variant="warning"
                                    />
                                </InsightSection>
                            </div>

                            {/* ==========================================
                                Missing Skills
                            ========================================== */}

                            <InsightSection
                                icon={AlertCircle}
                                title="Missing Skills"
                                description="Skills identified as gaps in your current profile."
                            >
                                <InsightList
                                    items={analysis.missingSkills}
                                    variant="danger"
                                />
                            </InsightSection>

                            {/* ==========================================
                                ATS Suggestions
                            ========================================== */}

                            <InsightSection
                                icon={Target}
                                title="ATS Suggestions"
                                description="Practical improvements to make your resume more ATS-friendly."
                            >
                                <InsightList
                                    items={analysis.atsSuggestions}
                                    variant="blue"
                                />
                            </InsightSection>

                            {/* ==========================================
                                Career Suggestions
                            ========================================== */}

                            <InsightSection
                                icon={Briefcase}
                                title="Career Suggestions"
                                description="Potential roles based on your current resume profile."
                            >
                                {analysis.careerSuggestions?.length ? (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {analysis.careerSuggestions.map(
                                            (item, index) => (
                                                <CareerCard
                                                    key={`${item.role}-${index}`}
                                                    item={item}
                                                />
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <EmptyInsight text="No career suggestions available." />
                                )}
                            </InsightSection>

                            {/* ==========================================
                                Learning Roadmap
                            ========================================== */}

                            <InsightSection
                                icon={BookOpen}
                                title="Learning Roadmap"
                                description="Recommended areas to focus on for career growth."
                            >
                                <InsightList
                                    items={analysis.learningRoadmap}
                                    variant="blue"
                                />
                            </InsightSection>

                            {/* ==========================================
                                Interview Preparation
                            ========================================== */}

                            <InsightSection
                                icon={MessageSquare}
                                title="Interview Preparation"
                                description="Questions generated from your resume profile."
                            >
                                {analysis.interviewQuestions?.length ? (
                                    <div className="space-y-3">
                                        {analysis.interviewQuestions.map(
                                            (item, index) => (
                                                <InterviewQuestion
                                                    key={`${item.question}-${index}`}
                                                    item={item}
                                                    index={index}
                                                />
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <EmptyInsight text="No interview questions available." />
                                )}
                            </InsightSection>

                            {/* ==========================================
                                Metadata
                            ========================================== */}

                            {analysis.metadata && (
                                <section className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
                                        {analysis.metadata.model && (
                                            <span>
                                                Model:{" "}
                                                <strong className="text-slate-700">
                                                    {
                                                        analysis
                                                            .metadata
                                                            .model
                                                    }
                                                </strong>
                                            </span>
                                        )}

                                        {analysis.metadata
                                            .processingTime && (
                                            <span>
                                                Processing time:{" "}
                                                <strong className="text-slate-700">
                                                    {
                                                        analysis
                                                            .metadata
                                                            .processingTime
                                                    }{" "}
                                                    ms
                                                </strong>
                                            </span>
                                        )}

                                        {analysis.metadata
                                            .analyzedAt && (
                                            <span>
                                                Analyzed:{" "}
                                                <strong className="text-slate-700">
                                                    {new Date(
                                                        analysis
                                                            .metadata
                                                            .analyzedAt
                                                    ).toLocaleString()}
                                                </strong>
                                            </span>
                                        )}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

// ============================================================
// Alert Message
// ============================================================

const AlertMessage = ({ type, message, onClose }) => {
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
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
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
// Selected File Card
// ============================================================

const SelectedFileCard = ({
    file,
    uploading,
    onUpload,
    onRemove,
}) => {
    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                        <FileText className="h-5 w-5 text-blue-600" />
                    </div>

                    <div className="min-w-0">
                        <p
                            className="truncate text-sm font-semibold text-slate-800"
                            title={file.name}
                        >
                            {file.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                            {" • "}PDF
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex">
                    <button
                        type="button"
                        onClick={onRemove}
                        disabled={uploading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        <X className="h-4 w-4" />
                        Remove
                    </button>

                    <button
                        type="button"
                        onClick={onUpload}
                        disabled={uploading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {uploading ? (
                            <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4" />
                                <span>Analyze</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Empty Resume State
// ============================================================

const EmptyResumeState = ({ onUpload }) => {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <FileText className="h-7 w-7 text-blue-600" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
                Your resume workspace is ready
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Upload your resume to receive an AI-powered analysis of
                your skills, ATS readiness, career opportunities and
                improvement areas.
            </p>

            <button
                type="button"
                onClick={onUpload}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
                <Upload className="h-4 w-4" />
                Upload Resume
            </button>
        </section>
    );
};

// ============================================================
// Resume Score Card
// ============================================================

const ResumeScoreCard = ({ score = 0 }) => {
    const safeScore = Math.min(
        100,
        Math.max(0, Number(score) || 0)
    );

    return (
        <div className="relative overflow-hidden rounded-3xl bg-blue-950 p-6 text-white shadow-sm sm:p-7">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-800/40 blur-2xl" />

            <div className="relative">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-white/10 p-2">
                                <Target className="h-4 w-4 text-blue-200" />
                            </div>

                            <p className="text-sm font-medium text-blue-100">
                                Resume Score
                            </p>
                        </div>

                        <div className="mt-5 flex items-end gap-2">
                            <span className="text-5xl font-bold tracking-tight">
                                {safeScore}
                            </span>

                            <span className="mb-1.5 text-xl text-blue-200">
                                /100
                            </span>
                        </div>
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
                        AI Score
                    </div>
                </div>

                <div className="mt-7">
                    <div className="mb-2 flex justify-between text-xs text-blue-200">
                        <span>Current readiness</span>
                        <span>{safeScore}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                            className="h-full rounded-full bg-blue-400 transition-all duration-700"
                            style={{
                                width: `${safeScore}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Overview Card
// ============================================================

const OverviewCard = ({
    icon: Icon,
    title,
    value,
    description,
}) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
                        {value}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                        {description}
                    </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3">
                    <Icon className="h-5 w-5 text-blue-600" />
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Insight Section
// ============================================================

const InsightSection = ({
    icon: Icon,
    title,
    description,
    children,
}) => {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-start gap-3 sm:mb-6">
                <div className="rounded-xl bg-blue-50 p-2.5">
                    <Icon className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1 text-sm leading-5 text-slate-500">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {children}
        </section>
    );
};

// ============================================================
// Skill Card
// ============================================================

const SkillCard = ({ skill = {} }) => {
    const confidence = Math.min(
        100,
        Math.max(0, Number(skill.confidence) || 0)
    );

    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4 transition hover:border-blue-200 hover:bg-blue-50/30">
            <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 break-words font-semibold text-slate-800">
                    {skill.name || "Unnamed Skill"}
                </h3>

                {skill.level && (
                    <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                        {skill.level}
                    </span>
                )}
            </div>

            <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                    <span>Confidence</span>
                    <span className="font-semibold text-slate-700">
                        {confidence}%
                    </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-700"
                        style={{
                            width: `${confidence}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Insight List
// ============================================================

const InsightList = ({
    items = [],
    variant = "blue",
}) => {
    if (!items?.length) {
        return <EmptyInsight text="No insights available." />;
    }

    const styles = {
        blue: {
            dot: "bg-blue-500",
            badge: "bg-blue-50 text-blue-700",
            border: "border-blue-100",
        },
        success: {
            dot: "bg-emerald-500",
            badge: "bg-emerald-50 text-emerald-700",
            border: "border-emerald-100",
        },
        warning: {
            dot: "bg-amber-500",
            badge: "bg-amber-50 text-amber-700",
            border: "border-amber-100",
        },
        danger: {
            dot: "bg-red-500",
            badge: "bg-red-50 text-red-700",
            border: "border-red-100",
        },
    };

    const style = styles[variant] || styles.blue;

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div
                    key={`${item?.title || "insight"}-${index}`}
                    className={`rounded-2xl border bg-slate-50/40 p-4 sm:p-5 ${style.border}`}
                >
                    <div className="flex items-start gap-3">
                        <span
                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`}
                        />

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="break-words font-semibold text-slate-900">
                                    {item?.title || "Insight"}
                                </h3>

                                {item?.priority && (
                                    <span
                                        className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-bold ${style.badge}`}
                                    >
                                        {item.priority}
                                    </span>
                                )}
                            </div>

                            {item?.reason && (
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {item.reason}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ============================================================
// Career Card
// ============================================================

const CareerCard = ({ item = {} }) => {
    const match = Math.min(
        100,
        Math.max(
            0,
            Number(item.matchPercentage) || 0
        )
    );

    return (
        <div className="group rounded-2xl border border-slate-200 bg-slate-50/40 p-5 transition hover:border-blue-200 hover:bg-blue-50/30">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                        Suggested Role
                    </p>

                    <h3 className="break-words font-semibold text-slate-900">
                        {item.role || "Career Role"}
                    </h3>
                </div>

                <div className="flex shrink-0 items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                    {match}%
                    <ArrowUpRight className="h-3 w-3" />
                </div>
            </div>

            {item.reason && (
                <p className="mt-4 text-sm leading-6 text-slate-500">
                    {item.reason}
                </p>
            )}

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-700"
                    style={{
                        width: `${match}%`,
                    }}
                />
            </div>
        </div>
    );
};

// ============================================================
// Interview Question
// ============================================================

const InterviewQuestion = ({ item = {}, index }) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4 sm:p-5">
            <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                    {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        {item.topic && (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                                {item.topic}
                            </span>
                        )}

                        {item.difficulty && (
                            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                                {item.difficulty}
                            </span>
                        )}
                    </div>

                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-800 sm:text-base">
                        {item.question || "Interview question"}
                    </p>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Empty Insight
// ============================================================

const EmptyInsight = ({ text }) => {
    return (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-5 py-8 text-center">
            <ShieldCheck className="mx-auto h-7 w-7 text-slate-300" />

            <p className="mt-2 text-sm text-slate-500">
                {text}
            </p>
        </div>
    );
};

// ============================================================
// Loading
// ============================================================

const ResumeLoading = () => {
    return (
        <div className="mx-auto w-full max-w-7xl space-y-6">
            <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-7">
                <div className="flex gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-slate-100" />

                    <div className="flex-1">
                        <div className="h-3 w-24 rounded bg-slate-100" />
                        <div className="mt-3 h-8 w-64 rounded bg-slate-100" />
                        <div className="mt-2 h-4 w-96 max-w-full rounded bg-slate-100" />
                    </div>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
                <div className="h-40 animate-pulse rounded-3xl bg-slate-100" />
                <div className="h-40 animate-pulse rounded-3xl bg-slate-100" />
                <div className="h-40 animate-pulse rounded-3xl bg-slate-100" />
            </div>

            <div className="h-72 animate-pulse rounded-3xl bg-slate-100" />

            <div className="h-56 animate-pulse rounded-3xl bg-slate-100" />
        </div>
    );
};

export default Resume;