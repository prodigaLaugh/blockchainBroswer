<template>
  <div  class="commonHeaderWrap">
    <div class="commonHeader">
      <div class="commonHeaderLeftWrap">
        logo
      </div>
      <div class="commonHeaderCenterWrap">
        <select>
          <option value="11">111</option>
        </select>
        <input 
          placeholder="搜索地址/交易ID/区块高度/资产名/资产ID/UTXO"
          type="text">
      </div>
      <div class="commonHeaderRightWrap">
        admin
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
      padding:0 20px;
      display:flex;
      justify-content: space-between;
      align-items:center;
      background:#eee;
      .commonHeaderCenterWrap{
        flex:1;
        margin-left:30px;
        margin-right:50px;
        display:flex;
        >select{
          width:200px;
        }
        >input{
          margin-left:20px;
          flex:1;
          border:1px solid #ddd;
          padding-left:10px;
        }
      }
    }
    
  }
</style>

