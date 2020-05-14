<template>
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-5 pt-3">
            <div class="search-game">
                <div class="form-group pb-3">
                    <label class="search-game__label" for="name">Название игры</label>
                    <input class="search-game__input form-control" name="name" type="text" v-model="insertGame" @keyup.enter="searchGame">

                    <div class="mt-3 alert alert-danger" role="alert" v-if="empty">
                        <span class="search-game__message_error"><i class="fas fa-exclamation-triangle"></i> {{ empty }}</span>
                    </div>

                </div>
                <button type="button" class="btn btn-outline-primary" @click="searchGame">
                    <i class="fas fa-search"></i>
                    Найти
                </button>
                <button type="button" class="btn btn-outline-danger" @click="clearData">
                    <i class="far fa-trash-alt"></i>
                    Очистить
                </button>
            </div>

            <div class="mt-3 alert alert-danger" role="alert" v-if="error">
                <span class="search-game__message_error"><i class="fas fa-exclamation-triangle"></i> {{ error }}</span>
            </div>
        </div>

        <div class="col-xl-3 col-lg-4 col-md-4 pt-3">
            <transition name="fade">
                <div class="found-games" v-if="games">
                    <div class="found-games__item mb-3" v-for="(game, index) in games" v-bind:key="index" v-on:click="selectGame(index)" v-bind:class="{ 'found-games__item_active': selectGameIndex === index }">
                        <div class="found-games__cover mr-2" v-bind:style="{ backgroundImage: 'url(' + game.background_image + ')' }"></div>
                        <h4 class="found-games__title">
                            {{ game.name }} <span class="pr-2">{{ game.released | moment('L')}}</span>
                        </h4>
                    </div>
                </div>
            </transition>
        </div>

        <div class="col-xl-3 col-lg-4 col-md-4 pt-3" v-if="currentGame">
            <transition name="fade">
                <div class="found-game">
                    <img class="found-game__img" :src="currentGame.background_image" v-if="currentGame.background_image" :alt="currentGame.slug">
                    <div class="card-body">
                        <h4 class="pt-2">
                            {{ currentGame.name }}
                        </h4>
                        <span class="ml-1 mr-1" v-for="(platform, index) in currentGame.parent_platforms" v-bind:key="index">
                            <i v-if="platform.platform.slug == 'xbox'" class="fab fa-md fa-xbox"></i>
                            <i v-if="platform.platform.slug == 'playstation'" class="fab fa-md fa-playstation"></i>
                            <i v-if="platform.platform.slug == 'pc'" class="fab fa-md fa-windows"></i>
                        </span>
                        <p class="card-text" v-if="currentGame.metacritic">
                            Metacritic: <b>{{ currentGame.metacritic }}</b>
                        </p>
                        <div class="form-group">
                            <label for="selectMyRating">My rating</label>
                            <select v-model="currentGame.my_rating" class="form-control" id="selectMyRating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <input v-model="currentGame.complete_flag" class="form-check-input" type="checkbox" id="completeGameCheckbox" value="option1">
                                <label class="form-check-label" for="completeGameCheckbox">Игра пройдена</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <input v-model="currentGame.angry_flag" class="form-check-input" type="checkbox" id="angryGameCheckbox" value="option2">
                                <label class="form-check-label" for="angryGameCheckbox">Взбесила</label>
                            </div>
                        </div>

                        <div class="mt-3 alert alert-success" role="alert" v-if="added">
                            <span class="search-game__message_success"><i class="fas fa-check"></i> Добавлено</span>
                        </div>
                        <div class="form-group" v-else>
                            <button type="button" @click="addGame" class="btn btn-outline-primary">
                                <i class="fas fa-plus"></i>
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'CharacterCreator',
        data: function () {
            return {
                games: null,
                insertGame: null,
                error: null,
                added: null,
                empty: null,
                currentGame: null,
                selectGameIndex: null
            }
        },
        methods: {
            searchGame: function () {
                this.clearData();

                if ( this.insertGame == null ) {
                    this.empty = 'Введите название игры!';
                } else {
                    const url = 'https://api.rawg.io/api/games?page_size=9&search=' + this.insertGame;

                    axios
                        .get( url )
                        .then( response => ( this.games = response.data.results ))
                        .catch(error => console.log(error));
                }
            },

            selectGame: function ( index ) {
                this.currentGame = null;
                this.selectGameIndex = index;

                const game = this.games[index];
                const url = 'https://api.rawg.io/api/games/' + game.slug;
                // const url = 'https://api.rawg.io/api/games?page_size=1&search=' + game.slug;

                axios
                    .get( url )
                    .then( response => {
                        this.currentGame = response.data;
                        // this.currentGame = response.data.results[0];
                        this.currentGame.my_rating = 1;
                        this.currentGame.complete_flag = false;
                        this.currentGame.background_image__crop = this.getCropImage( this.currentGame.background_image );

                    })
                    .catch(error => ( this.error = error ));
            },

            addGame: function () {
                let video = ( this.currentGame.clip ) ? this.currentGame.clip.clips.full : null;

                const addedGame = {
                    name: this.currentGame.name,
                    slug: this.currentGame.slug,
                    userRating: this.currentGame.my_rating,
                    releasedDate: this.currentGame.released,
                    addedDate: new Date(),
                    description: this.currentGame.description,
                    cover: this.currentGame.background_image,
                    coverCrop: this.currentGame.background_image__crop,
                    video: video,
                    metacritic: this.currentGame.metacritic,
                    completeFlag: this.currentGame.complete_flag,
                    angryFlag: this.currentGame.angry_flag,
                    platforms: this.currentGame.parent_platforms,
                    genres: this.currentGame.genres
                }

                axios
                    .post( 'http://192.168.1.229:3000/games', addedGame)
                    .then( response => {
                        this.added = response;
                    })
                    .catch(error => ( this.error = error ));
            },

            getCropImage: function ( image ) {
                const arrayOfStrings = image.split('media/');
                const cropImage = arrayOfStrings[0] + 'media/crop/600/400/' + arrayOfStrings[1];
                return cropImage;
            },

            clearData: function () {
                this.games = null;
                this.currentGame = null;
                this.selectGameIndex = null;
                this.empty = null;
                this.error = null;
                this.added = null;
            }
        },
    }
</script>

<style lang="scss">

</style>
