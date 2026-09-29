import { useEffect, useState } from "react";

import {
  FileSignature,
  Loader2,
  Copy,
  Trash2,
  RefreshCw,
} from "lucide-react";

import {
  generateCoverLetter,
  getCoverLetters,
  deleteCoverLetter,
} from "../../api/coverLetterApi";

const CoverLetter = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [coverLetter, setCoverLetter] = useState(null);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================
  // Fetch Cover Letter History
  // =====================================

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);

      const response = await getCoverLetters();

      console.log(
        "COVER LETTER HISTORY RESPONSE:",
        response.data
      );

      /*
        Backend response can have different structures.

        We safely extract the actual array instead
        of assuming response.data.data is an array.
      */

      const responseData = response.data;

      let historyData = [];

      if (Array.isArray(responseData)) {
        historyData = responseData;
      } else if (Array.isArray(responseData?.data)) {
        historyData = responseData.data;
      } else if (
        Array.isArray(responseData?.data?.coverLetters)
      ) {
        historyData =
          responseData.data.coverLetters;
      } else if (
        Array.isArray(responseData?.coverLetters)
      ) {
        historyData =
          responseData.coverLetters;
      }

      setHistory(historyData);

    } catch (error) {
      console.error(
        "Failed to fetch cover letter history:",
        error
      );

      setHistory([]);

      setError(
        error.response?.data?.message ||
          "Failed to load cover letter history."
      );

    } finally {
      setHistoryLoading(false);
    }
  };

  // =====================================
  // Load History On Page Load
  // =====================================

  useEffect(() => {
    fetchHistory();
  }, []);

  // =====================================
  // Generate Cover Letter
  // =====================================

  const handleGenerate = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!companyName.trim()) {
      setError("Company name is required.");
      return;
    }

    if (!jobTitle.trim()) {
      setError("Job title is required.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Job description is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await generateCoverLetter({
        companyName: companyName.trim(),
        jobTitle: jobTitle.trim(),
        jobDescription: jobDescription.trim(),
      });

      console.log(
        "COVER LETTER GENERATION RESPONSE:",
        response.data
      );

      const generatedLetter =
        response.data?.data;

      if (!generatedLetter) {
        throw new Error(
          "No cover letter data received from server."
        );
      }

      setCoverLetter(generatedLetter);

      setSuccess(
        "Cover letter generated successfully."
      );

      // Refresh history
      await fetchHistory();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (error) {
      console.error(
        "Cover letter generation error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate cover letter."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Extract Cover Letter Text
  // =====================================

  const getCoverLetterText = () => {
    if (!coverLetter) {
      return "";
    }

    return (
      coverLetter.coverLetter ||
      coverLetter.content ||
      coverLetter.text ||
      ""
    );
  };

  // =====================================
  // Copy Cover Letter
  // =====================================

  const handleCopy = async () => {
    const text = getCoverLetterText();

    if (!text) {
      setError(
        "No cover letter content available to copy."
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(text);

      setSuccess(
        "Cover letter copied to clipboard."
      );

      setError("");

    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );

      setError(
        "Unable to copy cover letter."
      );
    }
  };

  // =====================================
  // Delete Cover Letter
  // =====================================

  const handleDelete = async (id) => {
    try {
      setError("");

      await deleteCoverLetter(id);

      setHistory((previousHistory) =>
        Array.isArray(previousHistory)
          ? previousHistory.filter(
              (item) => item._id !== id
            )
          : []
      );

      if (coverLetter?._id === id) {
        setCoverLetter(null);
      }

      setSuccess(
        "Cover letter deleted successfully."
      );

    } catch (error) {
      console.error(
        "Failed to delete cover letter:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete cover letter."
      );
    }
  };

  // =====================================
  // Render
  // =====================================

  return (
    <div className="space-y-8">

      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div>
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <FileSignature
              className="text-indigo-600"
              size={26}
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              AI Cover Letter Generator
            </h1>

            <p className="mt-1 text-gray-600">
              Generate a personalized cover letter
              based on your resume and target job.
            </p>

          </div>

        </div>
      </div>

      {/* ================================= */}
      {/* Generator Form */}
      {/* ================================= */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold text-gray-900">
          Generate Cover Letter
        </h2>

        <form
          onSubmit={handleGenerate}
          className="space-y-5"
        >

          {/* Company */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company Name
            </label>

            <input
              type="text"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              placeholder="e.g. Google"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          {/* Job Title */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Job Title
            </label>

            <input
              type="text"
              value={jobTitle}
              onChange={(e) =>
                setJobTitle(e.target.value)
              }
              placeholder="e.g. Software Engineer"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          {/* Job Description */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              rows={8}
              placeholder="Paste the job description here..."
              className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          {/* Error */}

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Success */}

          {success && (
            <div className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Generate */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Generating...
              </>
            ) : (
              <>
                <FileSignature size={20} />

                Generate Cover Letter
              </>
            )}

          </button>

        </form>

      </div>

      {/* ================================= */}
      {/* Generated Cover Letter */}
      {/* ================================= */}

      {coverLetter && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-200 p-5">

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                Generated Cover Letter
              </h2>

              <p className="mt-1 text-sm text-gray-500">

                {coverLetter.companyName ||
                  companyName}

                {" • "}

                {coverLetter.jobTitle ||
                  jobTitle}

              </p>

            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >

              <Copy size={16} />

              Copy

            </button>

          </div>

          <div className="p-6">

            <div className="whitespace-pre-wrap rounded-xl bg-gray-50 p-6 text-sm leading-7 text-gray-800">

              {getCoverLetterText() ||
                "No cover letter content returned."}

            </div>

          </div>

        </div>
      )}

      {/* ================================= */}
      {/* History */}
      {/* ================================= */}

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Previous Cover Letters
            </h2>

            <p className="text-gray-600">
              Your previously generated cover letters.
            </p>

          </div>

          <button
            type="button"
            onClick={fetchHistory}
            className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50"
            title="Refresh"
          >

            <RefreshCw size={18} />

          </button>

        </div>

        {historyLoading ? (

          <div className="flex justify-center py-10">

            <Loader2
              className="animate-spin text-indigo-600"
            />

          </div>

        ) : history.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

            <p className="text-gray-500">
              No cover letters generated yet.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {Array.isArray(history) &&
              history.map((item) => (

                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
                >

                  <div>

                    <h3 className="font-semibold text-gray-900">

                      {item.companyName ||
                        "Company"}

                    </h3>

                    <p className="text-sm text-gray-500">

                      {item.jobTitle ||
                        "Software Engineer"}

                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    title="Delete"
                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default CoverLetter;