##
# @author Chris Peters c.concat.p@gmail.com
# @class Input
#
collision = require '../lib/collision'
signal = require '../lib/signal'
Sprite = require './sprite'
Base = require './base'

class Input extends Base
    ##
    #
    #
    constructor: (options)->
        # used as evtTarget if none 
        @bg = new Sprite
        @dragCandidate
        @pressCandidate
        @mouseCanDrag
        @isDragging
        @dragCandidateOffsetX
        @dragCandidateOffsetY
        @entityPool

        super()

        signal.addListener 'input', @inputHandler, @

    ##
    #
    #
    setEntityPool: (pool)->
        @entityPool = pool

    ##
    # @private
    #
    inputHandler: (e)->
        inputEvent = e.detail
        evtEl = inputEvent.currentTarget
        factor = 100 / (@getScaleFactor evtEl) / 100
        offsetX = evtEl.offsetLeft
        offsetY = evtEl.offsetTop
        eventTypes = []
        eventData =
            domEvent: inputEvent

        if inputEvent.hasOwnProperty 'touches'
            eventData.absX = inputEvent.touches[0].pageX - offsetX
            eventData.absY = inputEvent.touches[0].pageY - offsetY
        else
            eventData.absX = inputEvent.offsetX or inputEvent.clientX - evtEl.clientLeft
            eventData.absY = inputEvent.offsetY or inputEvent.clientY - evtEl.clientTop

        # coordinate positions relative to canvas scaling
        eventData.x = eventData.absX * factor;
        eventData.y = eventData.absY * factor;

        eventData.target = @getTarget eventData

        switch inputEvent.type
            when 'click', 'tap'
                if not @pressCandidate or not eventData.target or @pressCandidate.uid != eventData.target.uid
                    # remove potential target if it was not pressed AND released on
                    eventData.target = undefined

                @pressCandidate = null
                eventTypes.push 'press'

            when 'dblclick', 'dbltap'
                eventTypes.push 'dblpress'

            when 'mousedown', 'touchstart'
                @pressCandidate = eventData.target
                @dragCandidate = if eventData.target and eventData.target.getDraggable() then eventData.target else undefined
                
                if @dragCandidate?
                    @dragCandidateOffsetX = eventData.x - @dragCandidate.getX()
                    @dragCandidateOffsetY = eventData.y - @dragCandidate.getY()

                @mouseCanDrag = true;
                eventTypes.push 'pressdown'

            when 'mouseup', 'touchend'
                @mouseCanDrag = false

                if @isDragging
                    @isDragging = false
                    @dragCandidate = null
                    eventTypes.push 'dragend'

                eventTypes.push 'pressup'

            when 'mousemove', 'touchmove'
                if @mouseCanDrag and @dragCandidate? and @dragCandidate.getDraggable()

                    dragCandidatePosition = @dragCandidate.getPosition();

                    @dragCandidate.setX eventData.x - @dragCandidateOffsetX
                    @dragCandidate.setY eventData.y - @dragCandidateOffsetY

                    if not @isDragging
                        @isDragging = true
                        eventTypes.push 'dragstart'

                    eventTypes.push 'drag'

        if not evtTarget?
            evtTarget = @bg

            for type in eventTypes
                evtTarget[type](eventData)

        undefined

    ##
    # @private
    #
    getScaleFactor: (evtTarget)->
        factor = 1

        if evtTarget.style.width?
            canvasCssWidth = parseInt evtTarget.style.width, 10
            factor = canvasCssWidth / evtTarget.width

        factor

    ##
    # @private
    #
    getTarget: ()->
        @entityPool.each (layer)->
            layer.each (entity)->
                if collision.hitPoint e.x, e.y, entity
                    # continually assign higher sorted entity
                    topmostEntity = entity

        return topmostEntity;

module.exports = Input