<template>
  <form @submit.prevent='submitForm'>
    <div class='form-control' :class='{ invalid: !fullName.isValid }'>
      <label for='fullName'>姓名</label>
      <input
        type='text'
        id='fullName'
        name='姓名'
        v-model.trim='fullName.val'
        @blur="clearValidity('fullName')"
      />
      <p v-if='!fullName.isValid'>姓名不能为空哦，且需大于等于两个字</p>
    </div>
    <div class='form-control image-control' :class='{ invalid: !fullName.isValid }'>
      <label for='avatar'>头像</label>
      <img :src='avatar.val' id='avatar' name='头像' class='uploading-image' />
      <input type='file' accept='image/jpeg' @change=uploadImage class='image-uploader'>
    </div>
    <div class='form-control' :class='{ invalid: !description.isValid }'>
      <label for='description'>详细介绍</label>
      <textarea
        id='description'
        rows='5'
        name='详细介绍'
        v-model.trim='description.val'
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if='!description.isValid'>详细介绍不能为空</p>
    </div>
    <div class='form-control' :class='{ invalid: !rate.isValid }'>
      <label for='rate'>每小时收费</label>
      <input
        type='number'
        id='rate'
        name='小时费率'
        v-model.number='rate.val'
        @blur="clearValidity('rate')"
      />
      <p v-if='!rate.isValid'>金额需大于0</p>
    </div>
    <div class='form-control' :class='{ invalid: !areas.isValid }'>
      <h3>专业领域</h3>
      <div>
        <input
          type='checkbox'
          name='篮球'
          id='basketball'
          value='basketball'
          v-model='areas.val'
          @blur="clearValidity('areas')"
        />
        <label for='basketball'>篮球培训</label>
      </div>
      <div>
        <input
          type='checkbox'
          name='足球'
          id='soccer'
          value='soccer'
          v-model='areas.val'
          @blur="clearValidity('areas')"
        />
        <label for='soccer'>足球培训</label>
      </div>
      <div>
        <input
          type='checkbox'
          name='羽毛球'
          id='badminton'
          value='badminton'
          v-model='areas.val'
          @blur="clearValidity('areas')"
        />
        <label for='badminton'>羽毛球培训</label>
      </div>
      <div>
        <input
          type='checkbox'
          name='健身'
          id='fitness'
          value='fitness'
          v-model='areas.val'
          @blur="clearValidity('areas')"
        />
        <label for='fitness'>健身指导</label>
      </div>
      <p v-if='!areas.isValid'>至少需要选择一个专业培训领域哦</p>
    </div>
    <p v-if='!formIsValid'>请检查以上错误，并重新提交.</p>
    <base-button>注册</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      fullName: {
        val: '',
        isValid: true
      },
      avatar: {
        val: 'data:image/jpeg;base64,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',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.avatar.val = e.target.result;
      };
    },
    clearValidity(el) {
      this[el].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.fullName.val === '' || this.fullName.val.length < 2) {
        this.fullName.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const areasToSubmit = this.areas.val.map(area=>{
        if (area === 'basketball') {
          return {name: '篮球', class:'basketball'};
        } else if (area === 'soccer') {
          return {name: '足球', class:'soccer'};
        }else if (area === 'fitness') {
          return {name: '健身', class:'fitness'};
        }else if (area === 'badminton') {
          return {name: '羽毛球', class:'badminton'};
        }
      })
      const formData = {
        fullName: this.fullName.val,
        avatar: this.avatar.val,
        description: this.description.val,
        hourlyRate: this.rate.val,
        areas: areasToSubmit
      };
      this.$emit('save-data', formData);
    }
  }

};
</script>


<style scoped>
.image-control .uploading-image {
  display: flex;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 3px;
  margin-bottom: 0.5rem;
}

.image-control .image-uploader {
  border: none;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>