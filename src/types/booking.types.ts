
export const EVENT_TYPES = [
  { value: "public_speaking", label: "Foredrag" },
  { value: "podcast", label: "Podcast" },
  { value: "interview", label: "Intervju" },
  { value: "other", label: "Annet (spesifiser under)" },
] as const;

export type EventType = (typeof EVENT_TYPES)[number]["value"];

export type BookingPayload = {
  email: string;
  eventType: EventType;
  date: string;
  content: string;
  createdAt: string;
};

export type BookingFormProps = {
  onSubmit?: (payload: BookingPayload) => Promise<void> | void;
};

export type FormStatus = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

export type TouchedFields = {
  email: boolean;
  date: boolean;
  content: boolean;
};

export type FormErrors = Partial<Record<keyof TouchedFields, string>>;