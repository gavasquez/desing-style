import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { deleteShortById } from "@/actions/auth/shorts/delete-short-by-id";

interface Short {
  id: string;
  shortsUrl: string;
  createdAt: Date;
  updatedAt: Date;
  siteId: string;
}

export const RowShort = ({ id, shortsUrl, siteId, createdAt }: Short) => {
  
  const onDelete = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este Short?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      if (result.isConfirmed) {
        const { ok, message } = await deleteShortById(id);
        if (!ok) {
          return Toast.fire("Opsss!", message, "error");
        }
        Toast.fire("Success", message, "success");
      }
    });
  };

  return (
    <tr>
      <td>{shortsUrl}</td>
      <td className="text-center">
        <Image
          src={`https://img.youtube.com/vi/${shortsUrl}/maxresdefault.jpg`}
          width={150}
          height={150}
          alt={`Image Short ${shortsUrl}`}
          className="mx-auto"
        />
      </td>
      <td>{createdAt.toLocaleDateString()}</td>
      <td className="px-4 py-2">
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all"
          >
            <FaRegTrashAlt size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};
