<template>
  <div  class="commonHeaderWrap">
    <div class="commonHeader">
      <div class="commonHeaderLeftWrap">
        <!-- logo -->
				M0运维平台
      </div>

      <div class="commonHeaderRightWrap">
        <span>admin</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .commonHeaderWrap{
    height:60px;
    .commonHeader{
      position:fixed;
      left:0;
      top:0;
      right:0;
      height:60px;
      padding:0 40px;
      display:flex;
      justify-content: space-between;
      align-items:center;
      background:$blue;
      z-index:20;
			.commonHeaderLeftWrap{
				font-size:20px;
				color:#fff;
			}
    }
    .commonHeaderRightWrap{
      span{
        padding-right:32px;
        padding-left:28px;
        background:url(../assets/defaultAvatar.png) no-repeat left center;
        color:#fff;
        line-height:32px;
      }
    }
  }
</style>

