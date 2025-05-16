'use client';
import { deleteFormById } from "@/actions/auth/form/delete-form-by-id";
import { RegistrationForm } from "@prisma/client";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export const TableFormulario = ( { forms }: { forms?: RegistrationForm[]; } ) => {
  const onDelete = ( name: string, id: string ) => {
    Swal.fire( {
      title: "¿Estás seguro de eliminar este registro?",
      text: name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    } ).then( async ( result ) => {
      const Toast = Swal.mixin( {
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: ( toast ) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      } );
      if ( result.isConfirmed ) {
        const { ok, message } = await deleteFormById( id );
        if ( !ok ) {
          return Toast.fire( "Opsss!", message, "error" );
        }
        Toast.fire( "Success", message, "success" );
      }
    } );
  };

  return (
    <div className="mt-10 table-responsive">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de creación
            </th>
            <th scope="col" className="px-6 py-3">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          { forms?.map( ( form ) => (
            <tr
              key={ form.id }
              className="border-b last:border-b-0 border-gray-200 dark:border-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  { form.fullName }
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  { form.email }
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  { form.phoneNumber }
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                <div className="text-sm text-gray-900 dark:text-white">
                  { form.description }
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                <div className="text-sm text-gray-900 dark:text-white">
                  { new Date( form.createdAt ).toLocaleString() }
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={ () => onDelete( form.fullName, form.id ) }
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all"
                >
                  <FaRegTrashAlt size={ 20 } />
                </button>
              </td>
            </tr>
          ) ) }
        </tbody>
      </table>
    </div>

  );
};
