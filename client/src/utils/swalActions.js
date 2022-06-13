import Swal from 'sweetalert2'

export const createdAlert = ()=>{
    Swal.fire('Animal agregado con exito', '', 'success')
                .then((value)=>{
                    value && window.location.reload();
                    })
}