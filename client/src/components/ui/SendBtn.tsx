import { BsFillSendFill } from "react-icons/bs";

function SendBtn({ type, form }: { type: "button" | "submit"; form: string }) {
  return (
    <button
      form={form}
      type={type}
      className="w-10 h-10 bg-(--color-cards) rounded-lg border-2 border-(--color-primary) flex items-center justify-center"
    >
      <BsFillSendFill className="rounded-lg w-10/12 h-10/12 hover:text-(--color-cards) hover:cursor-pointer hover:bg-(--color-primary)" />
    </button>
  );
}

export default SendBtn;
