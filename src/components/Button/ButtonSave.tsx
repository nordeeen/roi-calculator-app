type ButtonSaveProps = {
  allEmpty: boolean;
  onSave: () => void;
  labelBtn: string;
};

export default function ButtonSave({
  allEmpty,
  onSave,
  labelBtn,
}: ButtonSaveProps) {
  return (
    <button
      type="button"
      disabled={allEmpty}
      onClick={onSave}
      className="cursor-pointer mt-4 w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-sm py-3.5 rounded-xl
        transition-all duration-200 shadow-md shadow-indigo-200 hover:shadow-indigo-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-30">
      {labelBtn}
    </button>
  );
}
