import IconChecked from "../../../../assets/images/icons/checked.svg";
import Image from "next/image";

interface ItemTarefaProps {
  label: string;
}
export function ItemTarefa({ label }: ItemTarefaProps) {
  return (
    <li className="flex items-start gap-3">
      <Image src={IconChecked} alt="Icon check" />{" "}
      <span className="block w-full text-lg font-semibold text-light-text">
        {label}
      </span>
    </li>
  );
}