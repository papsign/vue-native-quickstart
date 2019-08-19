<template>
    <nb-swipe-row 
        :leftOpenValue="leftOpenValue"
        :rightOpenValue="rightOpenValue"
        :stopLeftSwipe="leftOpenValue"
        :stopRightSwipe="rightOpenValue"
        :directionalDistanceChangeThreshold="directionalDistanceChangeThreshold"
        :setScrollEnabled="setScrollEnabled"
        :left="getSwipeLeft()"
        :right="getSwipeRight()"
        :body="getSwipeBody()"
        ref="cswipe"
    >
    <!--
        <slot name="left"></slot>
        <slot name="right"></slot>
        <slot />
    -->
    </nb-swipe-row>
</template>

<script>
export default {
    props: {
        leftOpenValue: {
            type: Number,
            default: 75
        },
        rightOpenValue: {
            type: Number,
            default: -75
        },
        directionalDistanceChangeThreshold: {
            type: Number,
            default: 10
        },
        setScrollEnabled: {
            type: Function,
            default: ()=>{}
        },
    },
    mounted(){
    },
    methods: {
        openLeft: function() {
            this.$refs.cswipe._root.openLeftRow()
        },
        openRight: function() {
            this.$refs.cswipe._root.openRightRow()
        },
        close: function() {
            this.$refs.cswipe._root.closeRow()
        },
        getSwipeLeft: function() {
            for(let i= 0; i<this.$slots.default.length; i++){
                if(this.$slots.default[i].props && this.$slots.default[i].props.dataSlot === "left")
                return this.$slots.default[i]
            }
            return this.$slots['left']
        },
        getSwipeRight: function() {
            for(let i= 0; i<this.$slots.default.length; i++){
                if(this.$slots.default[i].props && this.$slots.default[i].props.dataSlot === "right")
                return this.$slots.default[i]
            }
            return this.$slots['right']
        },
        getSwipeBody: function() {
            for(let i= 0; i<this.$slots.default.length; i++){
                if(this.$slots.default[i].props && (this.$slots.default[i].props.dataSlot === undefined || this.$slots.default[i].props.dataSlot === "body"))
                return this.$slots.default[i]
            }
        }
    }
  }
</script>
