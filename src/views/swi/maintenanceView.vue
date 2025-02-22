<template>
    <div>
        <section class="py-24 relative">
            <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div class="w-full flex-col justify-center items-center lg:gap-14 gap-10 inline-flex">

                    <div class="w-full flex-col justify-center items-center gap-5 flex">
                        <div class="w-full flex-col justify-center items-center gap-6 flex">
                            <div class="w-full flex-col justify-start items-center gap-2.5 flex">
                                <h2 class="text-center text-gray-800 text-3xl font-bold font-manrope leading-normal">
                                    Please bear with us! We're currently under maintenance.</h2>
                                <p class="text-center text-gray-500 text-base font-normal leading-relaxed">It's going to
                                    take some time to fix the error. We'll be back online in.</p>
                            </div>
                            <div class="flex items-start justify-center w-full gap-1 count-down-main">
                                <div class="timer">
                                    <div class="">
                                        <h3
                                            class="countdown-element days text-center text-black text-3xl font-normal font-manrope leading-normal">
                                        </h3>
                                    </div>
                                </div>
                                <h3 class="text-center text-black text-3xl font-normal font-manrope leading-normal">:
                                </h3>
                                <div class="timer">
                                    <div class="">
                                        <h3
                                            class="countdown-element hours text-center text-black text-3xl font-normal font-manrope leading-normal">
                                        </h3>
                                    </div>
                                </div>
                                <h3 class="text-center text-black text-3xl font-normal font-manrope leading-normal">:
                                </h3>
                                <div class="timer">
                                    <div class="">
                                        <h3
                                            class="countdown-element minutes text-center text-black text-3xl font-normal font-manrope leading-normal">
                                        </h3>
                                    </div>
                                </div>
                                <h3 class="text-center text-black text-3xl font-normal font-manrope leading-normal">:
                                </h3>
                                <div class="timer">
                                    <div class="">
                                        <h3
                                            class="countdown-element seconds text-center text-black text-3xl font-normal font-manrope leading-normal">
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full justify-center items-center gap-2.5 flex sm:flex-row flex-col">
                                <button @click="Goback"
                                    class="sm:w-fit w-full px-3.5 py-2 bg-indigo-700 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                                    <span
                                        class="px-1.5 text-white text-sm font-medium leading-6 whitespace-nowrap">Back</span>
                                </button>
                            </div>
                        </div>
                        <img src="https://pagedone.io/asset/uploads/1718004199.png" alt="under maintenance image"
                            class="object-cover">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        };
    },
    computed: {

    },
    methods: {
        Goback() {
            this.$router.push('/')
        }
    },
};
</script>