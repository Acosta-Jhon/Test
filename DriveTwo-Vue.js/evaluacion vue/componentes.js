var AgregarModal = {
  template: //html
    `<div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <div class="box">
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control">
            <input v-model="nombre" name="nombre" class="input is-success" type="text" placeholder="Nombre de estudiante" required>
          </div>
        </div>
        <div class="field">
          <label classs="label">Nota 1</label>
          <div class="control">
            <input
              v-model.number="nota1"
              name="nota1"
              type="number"
              max="20"
              min="0"
              class="input is-success"
              placeholder="Ingrese nota 1"
              required
            >
          </div>
        </div>
        <div class="field">
          <label class="label">Nota 2</label>
          <div class="control">
            <input
              v-model.number="nota2"
              name="nota2"
              type="number"
              max="20"
              min="0"
              class="input is-success"
              placeholder="Ingrese nota 2"
              required
            >
          </div>
        </div>

        <div v-if="!!id" class="title">
          <label class="label">Promedio</label>
          <div class="control">
            <input v-model.number="promedio" name="promedio" class="input is-success" type="text" placeholder="promedio" disabled>
          </div>
        </div>

        <br>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" @click="submit">
              <span v-if="id == ''">GUARDAR</span>
            </button>
          </div>
          <div class="control">
            <button type="button" class="button is-light" @click="closeModal()">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  props: {
    id: { type: String },
  },
  data() {
    return {
      nota1: '',
      nota2: '',
      nombre: '',
    }
  },
  methods: {
    submit() {
      this.$emit('done', {
        nombre: this.nombre,
        nota1: this.nota1,
        nota2: this.nota2,
      })
    },
    closeModal() {
      this.$emit('close == false')
    }
  },
}

var Tabla = {
  template: //html
    `<table class="table is-striped is-fullwidth">
    <tr>
      <th>ID</th>
      <th>Nombre</th>                        
      <th>Nota 1</th>
      <th>Nota 2</th>
      <th>Promedio</th>
      <th>Estado</th>  
      <th>Opciones</th>   
    </tr>
    <tr v-for="(item, index) in dataTabla" v-if="dataTabla.length > 0" >
      <td v-text="item.id"></td>
      <td v-text="item.nombre"></td>
      <td v-text="item.nota1"></td>
      <td v-text="item.nota2"></td>
      <td v-text="item.promedio" ></td>    
      <td>
      <span v-if="item.promedio >=12" class="has-text-success">{{item.estado }}</span>
      <span v-if="item.promedio < 12" class="has-text-danger">{{item.estado}}</span>
      <td>
      <div class="buttons has-addons">
      <span type="submit" @click="borrarEstudiante(index)" class="button is-danger">Borrar</span>   
      <span type="submit" @click="edit(item)" class="button is-info">Editar</span>
      </div>
      </td>
    </tr>
    
   </table>
  `,
  props: {
    dataTabla: { type: Array, required: true },
  },
  methods: {
    borrarEstudiante(index) {
      let db = this.dataTabla;
      db.splice(index, 1);
      // console.log(index);
    },
    data() {
      return {
        id: '',
        nota1: '',
        nota2: '',
        nombre: '',
        promedio: '',
      }
    },
    edit(item) {
      this.$emit('done')
      this.id = item.id
      this.nombre = item.nombre
      this.nota1 = item.nota1
      this.nota2 = item.nota2
      this.promedio = item.promedio

      console.log(item)
    }
  },
}
