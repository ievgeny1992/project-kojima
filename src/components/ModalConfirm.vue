<template>
    <transition name="fade">
        <div class="modal">
            <div class="modal__window">
                <div class="modal__inner row align-items-center no-gutters">
                    <div class="col-7">
                        <p class="modal__text">
                            Удалить {{ game.name }}?
                        </p>
                    </div>
                    <div class="col">
                        <button class="modal__button modal__button_confirm" @click="onConfirm">
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
    </transition>
</template>

<script>
export default {
    name: 'ModalConfirm',
    props: [ "game" ],
	methods: {
		onConfirm() {
			this.$emit("confirm");
		},
		onCancel() {
			this.$emit("cancel");
		}
	}
}
</script>

<style lang="scss" scoped>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(51, 50, 55, .8);
        backdrop-filter: saturate(280%) blur(5px);
        z-index: 9999;

        &__window {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 96%;
            max-width: 650px;
            height: 125px;
            transform: translate(-50%, -50%);
            background-color: $bg-color;
            padding: 0px 0px 0px 20px;
            border-radius: 10px;
        }

        &__inner {
            height: 100%;
        }

        &__text {
            width: 100%;
            margin: 0px;
            padding: 0px 10px 0px 0px;
            text-align: center;
            font-size: 18px;
        }

        &__button {
            background: transparent;
            width: 100%;
            height: 125px;
            color: #fff;
            font-size: 27px;
            padding: 0px;
            border: none;
            border-left: 2px solid #26272c;
            outline: none;
            cursor: pointer;
            transition: all .2s;

            &:focus {
                outline: none !important;
                background-color: #26272c;
            }

            &:hover {
                outline: none !important;
                background-color: #26272c;
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