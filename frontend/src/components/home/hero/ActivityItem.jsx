const ActivityItem = ({ title, time }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

        <span className="text-slate-700">
          {title}
        </span>
      </div>

      <span className="text-xs text-slate-400">
        {time}
      </span>
    </div>
  );
};

export default ActivityItem;