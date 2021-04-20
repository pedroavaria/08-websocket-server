

const socket = io()
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')

const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')


btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value
    const payload = {
        mensaje,
        id: '123456abcd',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id);
    })
})


socket.on('connect', () => {
    console.log('Conectado');
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
})

socket.on('disconnect', () => {
    console.log('Desconectados del servidor');
    lblOnline.style.display = 'none'
    lblOffline.style.display = ''
})

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
})