var app = new Vue({
  el: '#app',
  components: {
    'tabla': Tabla,
    'Agregar': AgregarModal
  },
  data: {
    lista: [
      
    ],
    id: 0,
    mostrarModal: false,
  },
  methods: {
    agregarEstudiante(doc) {
      console.log(this.lista)
      this.id = this.id + 1
      promedio = (doc.nota1 + doc.nota2) / 2
      estado = promedio >= 12 ? 'APROBADO' : 'REPROBADO'
      this.lista.push({ nombre: doc.nombre, promedio: promedio, nota1: doc.nota1, nota2: doc.nota2, estado: estado, id: this.id });
      // alert("Ingresado correctamente")
      this.mostrarModal = false
    },
    editarEstudiante(doc) {
      this.mostrarModal = true;
      
    },
  }
})



