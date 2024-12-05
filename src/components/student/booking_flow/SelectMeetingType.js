import React from "react";
import { Clock } from "lucide-react";

export default function MeetingTypeSelector({
  meetingTypes,
  selectedType,
  onSelect,
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Select Meeting Type</h3>
      <div className="grid gap-3">
        {meetingTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`flex items-center p-4 rounded-lg border transition-colors ${
              selectedType === type.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <Clock className="w-5 h-5 mr-3 text-gray-500" />
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">{type.name}</p>
              <p className="text-sm text-gray-500">{type.durationMinutes} minutes</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

