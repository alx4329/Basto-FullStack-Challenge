import Swal from 'sweetalert2'
import {deleteCow} from '../actions/actions'
export const handleDeleteCow = async (id) => {
    Swal.fire({
        title: 'Esta seguro?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then(async(result) => {
        if (result.isConfirmed) {
            try{
                const deleted = await deleteCow(id)
                Swal.fire(
                  'Eliminado!',
                  'El animal ha sido eliminado.',
                  'success'
                )
            }catch(e){
                Swal.fire(
                  'Error!',
                  'Algo salió mal',
                  'error'
                )
            }
            
        }
      })
}