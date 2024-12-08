const DEFAULT_MORNING_WINDOW = {
  start: '08:00',
  end: '12:00',
  slots: 2,
  meetingTypeId: '',
};

const DEFAULT_AFTERNOON_WINDOW = {
  start: '13:00',
  end: '17:00',
  slots: 2,
  meetingTypeId: '',
};

// Define the initial schedule using a variable
const INITIAL_SCHEDULE = {
  0: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  1: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  2: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  3: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  4: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  5: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
  6: { enabled: false, windows: [{ ...DEFAULT_MORNING_WINDOW }, { ...DEFAULT_AFTERNOON_WINDOW }] },
};

export const SCHEDULE_CONSTANTS = {
  MAX_SLOTS: 8,
  MIN_SLOTS: 1,
  SLOT_DURATION_MINUTES: 120, // Default 2 hours
  DEFAULT_MORNING_WINDOW,
  DEFAULT_AFTERNOON_WINDOW,
  DAYS_MAP: {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  },
  DAYS_MAP_REVERSE: {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  },
  INITIAL_SCHEDULE,
};
