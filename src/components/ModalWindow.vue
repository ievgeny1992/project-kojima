<template>
  <div class="modal">
    <div class="modal__window">
      <div class="modal__inner row align-items-center no-gutters">
        <button class="modal__button_close" @click="onCancel">
          <i class="far fa-times"></i>
        </button>
        <div class="col-9">
          <p class="modal__text">Удалить {{ name }}?</p>
        </div>
        <div class="col">
          <button class="modal__button modal__button_delete" @click="onConfirm">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  props: ["name", "show"],
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
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgba(51, 50, 55, 0.98);
  // backdrop-filter: saturate(180%) blur(15px);
  z-index: 9999;

  &__window {
    position: relative;
    width: 90%;
    max-width: 650px;
    height: 100px;
    margin: auto;
    @include media-breakpoint-up(md) {
      height: 125px;
    }
  }

  &__inner {
    position: relative;
    background-color: $bg-modal-color;
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
    font-size: 24px;
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

    &_delete {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      & > i {
        color: #c94052;
      }
    }

    &_close {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      top: -6px;
      left: -6px;
      border: 0;
      border-radius: 12px;
      background-color: $bg-modal-color;
      box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.2);
      transition: all 0.25s ease;
      outline: none;
      list-style: none;
      cursor: pointer;
      z-index: 200;

      & > i {
        color: #fff;
        opacity: 0.7;
        font-size: 17px;
      }

      &:hover {
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
        transform: translate(2px, 2px);
      }

      &:focus {
        outline: none !important;
      }
    }
  }
}
</style>
