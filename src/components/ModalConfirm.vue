<template>
  <div class="modal">
    <div class="modal__window">
      <div class="modal__inner row align-items-center no-gutters">
        <div class="col-7">
          <p class="modal__text">Удалить {{ name }}?</p>
        </div>
        <div class="col">
          <button
            class="modal__button modal__button_confirm"
            @click="onConfirm"
          >
            <i class="far fa-check"></i>
          </button>
        </div>
        <div class="col">
          <button class="modal__button modal__button_cancel" @click="onCancel">
            <i class="far fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirm",
  props: ["name"],
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(51, 50, 55, 0.8);
  backdrop-filter: saturate(280%) blur(5px);
  z-index: 9999;

  &__window {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 96%;
    max-width: 650px;
    height: 100px;
    transform: translate(-50%, -50%);

    @include media-breakpoint-up(md) {
      height: 125px;
    }
  }

  &__inner {
    background-color: $bg-color;
    padding: 0px 0px 0px 20px;
    border-radius: 10px;
  }

  &__text {
    width: 100%;
    margin: 0px;
    padding: 0px 10px 0px 0px;
    text-align: center;
    font-size: 16px;

    @include media-breakpoint-up(md) {
      font-size: 18px;
    }
  }

  &__button {
    background: transparent;
    width: 100%;
    height: 100px;
    color: #fff;
    font-size: 27px;
    padding: 0px;
    border: none;
    border-left: 2px solid $item-color;
    outline: none;
    cursor: pointer;
    transition: all 0.2s;

    @include media-breakpoint-up(md) {
      height: 125px;
    }

    &:focus {
      outline: none !important;
      background-color: $item-color;
    }

    &:hover {
      outline: none !important;
      background-color: $item-color;
    }

    &_confirm {
      & > .far {
        color: #4c8c33;
      }
    }

    &_cancel {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      & > .far {
        color: #c94052;
      }
    }
  }
}
</style>
