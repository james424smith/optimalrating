<template>
    <div class="col-lg-8 col-md-12">
        <div class="p-5 error-content text-center">
            <img src="~/assets/img/logo.png"  alt="Optimal Rating Logo">
            <h1 v-if="error.statusCode === 404">Page Not Found :(</h1>
            <p>Ulaşmak istediğiniz sayfa bulunamadı veya yayından kaldırıldı.</p>

            <div class="error-social">
                <a href="javascript:;"><i class="fa fa-facebook"></i></a>
                <a href="javascript:;"><i class="fa fa-twitter"></i></a>
                <a href="javascript:;"><i class="fa fa-youtube"></i></a>
            </div>
            <br>
            <b>İletişim</b> : info@optimalraiting.com
        </div>
    </div>
</template>

<script>
    export default  {
      props: ['error'],
    }
</script>

<style>
    .error-content img{
        filter: invert(70%);
        margin-bottom: 25px;
    }
    .error-content h1{
        font-size: 72px;
    }
    .error-social {
        font-size: 25px;
        margin-top: 20px;
    }
    .error-social  a{
        margin-left: 10px;
        border: 1px #ebebeb solid;
        padding: 10px;
        color: #000;
        border-radius: 15px;
    }
</style>
