<template>
  <form @submit.prevent="submitHandler" class="form">
    <fieldset>
      <legend>Личные данные</legend>
      <div class="controls-group">
        <BaseInput
          label="Фамилия"
          :value.sync="controls.surname.value"
          :is-invalid.sync="controls.surname.isInvalid"
          :invalid-message="controls.surname.invalidMessage"
        />
        <BaseInput
          label="Имя"
          :value.sync="controls.name.value"
          :is-invalid.sync="controls.name.isInvalid"
          :invalid-message="controls.name.invalidMessage"
        />
        <BaseInput
          label="Отчество"
          :value.sync="controls.patronymic.value"
          :is-invalid.sync="controls.patronymic.isInvalid"
          :invalid-message="controls.patronymic.invalidMessage"
        />
        <BaseInput
          label="Дата рождения"
          type="date"
          :value.sync="controls.dateOfBirth.value"
          :is-invalid.sync="controls.dateOfBirth.isInvalid"
          :invalid-message="controls.dateOfBirth.invalidMessage"
        />
        <BaseInput
          label="E-mail"
          type="mail"
          :value.sync="controls.email.value"
          :is-invalid.sync="controls.email.isInvalid"
          :invalid-message="controls.email.invalidMessage"
        />
      </div>
    </fieldset>
    <fieldset>
      <legend>Пол</legend>
      <radio-group
        :value.sync="controls.sex.value"
        :items="controls.sex.items"
      />
    </fieldset>
    <fieldset>
      <legend>Паспортные данные</legend>
      <div class="wrapper">
        <base-select
          label="Гражданство"
          :value.sync="controls.citizenship.value"
          :data="controls.citizenship.data"
        />
      </div>
      <div
        v-if="controls.citizenship.value === `Russia`"
        class="controls-group"
      >
        <BaseInput
          label="Серия паспорта"
          :value.sync="controls.passport.series.value"
          :is-invalid.sync="controls.passport.series.isInvalid"
          :invalid-message="controls.passport.series.invalidMessage"
        />
        <BaseInput
          label="Номер паспорта"
          :value.sync="controls.passport.number.value"
          :is-invalid.sync="controls.passport.number.isInvalid"
          :invalid-message="controls.passport.number.invalidMessage"
        />
        <BaseInput
          label="Дата выдачи"
          type="date"
          :value.sync="controls.passport.date.value"
          :is-invalid.sync="controls.passport.date.isInvalid"
          :invalid-message="controls.passport.date.invalidMessage"
        />
      </div>
      <div v-else-if="!!controls.citizenship.value" class="controls-group">
        <BaseInput
          label="Фамилия на латинице"
          :value.sync="controls.passport.surname.value"
          :is-invalid.sync="controls.passport.surname.isInvalid"
          :invalid-message="controls.passport.surname.invalidMessage"
        />
        <BaseInput
          label="Имя на латинице"
          :value.sync="controls.passport.name.value"
          :is-invalid.sync="controls.passport.name.isInvalid"
          :invalid-message="controls.passport.name.invalidMessage"
        />
        <BaseInput
          label="Номер паспорта"
          :value.sync="controls.passport.number.value"
          :is-invalid.sync="controls.passport.number.isInvalid"
          :invalid-message="controls.passport.number.invalidMessage"
        />
        <base-select
          label="Страна выдачи"
          :value.sync="controls.passport.country.value"
          :data="controls.passport.country.data"
        />
        <base-select
          label="Тип паспорта"
          :value.sync="controls.passport.type.value"
          :data="controls.passport.type.data"
        />
      </div>
    </fieldset>
    <fieldset>
      <legend>Меняли ли фамилию или имя?</legend>
      <radio-group
        :value.sync="personalChanged.value"
        :items="personalChanged.items"
      />
      <div v-show="personalChanged.value === `yes`" class="controls-group">
        <BaseInput
          label="Фамилия"
          :value.sync="controls.prevSurname.value"
          :is-invalid.sync="controls.prevSurname.isInvalid"
          :invalid-message="controls.prevSurname.invalidMessage"
        />
        <BaseInput
          label="Имя"
          :value.sync="controls.prevName.value"
          :is-invalid.sync="controls.prevName.isInvalid"
          :invalid-message="controls.prevName.invalidMessage"
        />
      </div>
    </fieldset>
    <button class="button" type="submit">Отправить</button>
  </form>
</template>

<script>
import citizenships from "../assets/data/citizenships.json";
import passportTypes from "../assets/data/passport-types.json";

import { defaultInputControlFactory, VALIDATE, validator } from "../utils";

import BaseInput from "./Form/BaseInput";
import BaseSelect from "./Form/BaseSelect";
import RadioGroup from "./Form/RadioGroup";

export default {
  data() {
    return {
      personalChanged: {
        value: `no`,
        items: [
          {
            label: `Нет`,
            value: `no`,
          },
          {
            label: `Да`,
            value: `yes`,
          },
        ],
      },
      controls: {
        surname: defaultInputControlFactory(),
        name: defaultInputControlFactory(),
        patronymic: defaultInputControlFactory(),
        dateOfBirth: defaultInputControlFactory(),
        email: defaultInputControlFactory(),
        sex: {
          value: `male`,
          items: [
            {
              label: `Мужской`,
              value: `male`,
            },
            {
              label: `Женский`,
              value: `female`,
            },
          ],
        },
        citizenship: {
          value: `Russia`,
          data: citizenships.map((item) => ({
            id: item.id,
            value: item.nationality,
          })),
        },
        passport: {
          series: defaultInputControlFactory(),
          number: defaultInputControlFactory(),
          date: defaultInputControlFactory(),
          surname: defaultInputControlFactory(),
          name: defaultInputControlFactory(),
          country: {
            value: ``,
            data: citizenships.map((item) => ({
              id: item.id,
              value: item.nationality,
            })),
          },
          type: {
            value: ``,
            data: passportTypes.map((item) => ({
              id: item.id,
              value: item.type,
            })),
          },
        },
        prevSurname: defaultInputControlFactory(),
        prevName: defaultInputControlFactory(),
      },
    };
  },
  components: { BaseInput, BaseSelect, RadioGroup },
  methods: {
    isValidForm() {
      let result = [
        validator[VALIDATE.RUSSIAN](this.controls.surname),
        validator[VALIDATE.RUSSIAN](this.controls.name),
        validator[VALIDATE.RUSSIAN](this.controls.patronymic),
        validator[VALIDATE.DATE](this.controls.dateOfBirth),
        validator[VALIDATE.MAIL](this.controls.email),
        validator[VALIDATE.DIGIT](this.controls.passport.number),
        validator[VALIDATE.LENGTH](this.controls.passport.number, 6),
      ];

      if (this.controls.citizenship.value === `Russia`) {
        result = [
          ...result,
          validator[VALIDATE.DATE](this.controls.passport.date),
          validator[VALIDATE.DIGIT](this.controls.passport.series),
          validator[VALIDATE.LENGTH](this.controls.passport.series, 4),
        ];
      } else {
        result = [
          ...result,
          validator[VALIDATE.ENGLISH](this.controls.passport.surname),
          validator[VALIDATE.ENGLISH](this.controls.passport.name),
        ];
      }

      if (this.personalChanged.value === `yes`) {
        result = [
          ...result,
          validator[VALIDATE.RUSSIAN](this.controls.prevSurname),
          validator[VALIDATE.RUSSIAN](this.controls.prevName),
        ];
      }

      return result.every((item) => item);
    },
    submitHandler() {
      if (!this.isValidForm()) return;

      let formData = {
        surname: this.controls.surname.value,
        name: this.controls.name.value,
        patronymic: this.controls.patronymic.value,
        dateOfBirth: this.controls.dateOfBirth.value,
        email: this.controls.email.value,
        sex: this.controls.sex.value,
        citizenship: this.controls.citizenship.value,
      };

      if (this.controls.citizenship.value === `Russia`) {
        formData = {
          ...formData,
          passport: {
            series: this.controls.passport.series.value,
            number: this.controls.passport.number.value,
            date: this.controls.passport.date.value,
          },
        };
      } else {
        formData = {
          ...formData,
          passport: {
            surname: this.controls.passport.surname.value,
            name: this.controls.passport.name.value,
            number: this.controls.passport.number.value,
            country: this.controls.passport.country.value,
            type: this.controls.passport.type.value,
          },
        };
      }

      if (this.personalChanged) {
        formData = {
          ...formData,
          prevSurname: this.controls.prevSurname.value,
          prevName: this.controls.prevName.value,
        };
      }

      console.log(JSON.stringify(formData));
    },
  },
};
</script>

<style scoped>
fieldset {
  border: none;
}

legend {
  font-size: 1.2em;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 1050px;
}

.controls-group {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

.wrapper {
  width: 300px;
  margin-bottom: 10px;
}

.button {
  padding: 10px 15px;
  background-color: cornflowerblue;
  color: white;
  align-self: flex-start;
  cursor: pointer;
}
</style>
