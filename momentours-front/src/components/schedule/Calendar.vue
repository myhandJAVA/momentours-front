<template>
    <div id="test">
        <vue-cal
            class="vuecal--green-theme"
            :events="eventList"
            @event-click="eventClicked"
            @cell-click="cellClicked"
            :time="false"
            active-view="month"
            hide-view-selector
            xsmall
            locale="ko"
            :disable-views="['years','year','week','day']"
            events-on-month-view="short"
        />
    </div>
</template>

<script setup>
    import { ref, defineProps} from 'vue'
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'

    const props = defineProps({
        events: Object,
        eventClicked: Function,
        cellClicked: Function
    });
    const eventList = props.events;
    const eventClicked = props.eventClicked;
</script>

<style scoped>
    #test{
        width: 500px;
        height: 500px;
    }

    .vuecal--month-view .vuecal__cell {
        height: 80px;
    }

    .vuecal--month-view .vuecal__cell-content {
        justify-content: flex-start;
        height: 100%;
        align-items: flex-end;
    }

.vuecal--month-view .vuecal__cell-date {
    padding: 4px;
    }
.vuecal--month-view .vuecal__no-event {
    display: none;
    } 
</style>
