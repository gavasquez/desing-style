import { YoutubeShorts } from "@prisma/client";
import { RowShort } from "./RowShort";

interface Props {
  shorts: YoutubeShorts[];
}

export const TableShorts = ({ shorts }: Props) => {
  return (
    <table className="table-fixed w-full text-center mt-10">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">ID Video</th>
          <th className="px-4 py-2">Imagen del Video</th>
          <th className="px-4 py-2">Creación</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {shorts.map((short) => (
          <RowShort key={ short.id } {...short} />
        ))}
      </tbody>
    </table>
  );
};
