(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.ngxSmartModal = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

/**
 * @license ngx-smart-modal
 * MIT license
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSmartModalService = (function () {
    function NgxSmartModalService() {
        this.modalStack = [];
    }
    /**
     * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
     * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
     *
     * @param {?} modalInstance The object that contains the given modal identifier and the modal itself.
     * @param {?=} force Optional parameter that forces the overriding of modal instance if it already exists.
     * @return {?} nothing special.
     */
    NgxSmartModalService.prototype.addModal = /**
     * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
     * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
     *
     * @param {?} modalInstance The object that contains the given modal identifier and the modal itself.
     * @param {?=} force Optional parameter that forces the overriding of modal instance if it already exists.
     * @return {?} nothing special.
     */
    function (modalInstance, force) {
        if (force) {
            var /** @type {?} */ i = this.modalStack.findIndex(function (o) {
                return o.id === modalInstance.id;
            });
            if (i > -1) {
                this.modalStack[i].modal = modalInstance.modal;
            }
            else {
                this.modalStack.push(modalInstance);
            }
            return;
        }
        this.modalStack.push(modalInstance);
    };
    /**
     * Retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    NgxSmartModalService.prototype.getModal = /**
     * Retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    function (id) {
        return this.modalStack.filter(function (o) {
            return o.id === id;
        })[0].modal;
    };
    /**
     * Alias of `getModal` to retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    NgxSmartModalService.prototype.get = /**
     * Alias of `getModal` to retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    function (id) {
        return this.getModal(id);
    };
    /**
     * Open a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    NgxSmartModalService.prototype.open = /**
     * Open a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    function (id, force) {
        if (force === void 0) { force = false; }
        var /** @type {?} */ instance = this.modalStack.find(function (o) {
            return o.id === id;
        });
        if (!!instance) {
            instance.modal.open(force);
        }
        else {
            throw new Error('Modal not found');
        }
    };
    /**
     * Close a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    NgxSmartModalService.prototype.close = /**
     * Close a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    function (id) {
        var /** @type {?} */ instance = this.modalStack.find(function (o) {
            return o.id === id;
        });
        if (!!instance) {
            instance.modal.close();
        }
        else {
            throw new Error('Modal not found');
        }
    };
    /**
     * Toggles a given modal
     * If the retrieved modal is opened it closes it, else it opens it.
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    NgxSmartModalService.prototype.toggle = /**
     * Toggles a given modal
     * If the retrieved modal is opened it closes it, else it opens it.
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    function (id, force) {
        if (force === void 0) { force = false; }
        var /** @type {?} */ instance = this.modalStack.find(function (o) {
            return o.id === id;
        });
        if (!!instance) {
            instance.modal.toggle(force);
        }
        else {
            throw new Error('Modal not found');
        }
    };
    /**
     * Retrieve all the created modals.
     *
     * @return {?} an array that contains all modal instances.
     */
    NgxSmartModalService.prototype.getModalStack = /**
     * Retrieve all the created modals.
     *
     * @return {?} an array that contains all modal instances.
     */
    function () {
        return this.modalStack;
    };
    /**
     * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
     *
     * @return {?} an array that contains all the opened modals.
     */
    NgxSmartModalService.prototype.getOpenedModals = /**
     * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
     *
     * @return {?} an array that contains all the opened modals.
     */
    function () {
        var /** @type {?} */ modals = [];
        this.modalStack.forEach(function (o) {
            if (o.modal.visible) {
                modals.push(o);
            }
        });
        return modals;
    };
    /**
     * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
     * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
     * Use it to make a modal appear foreground.
     *
     * @return {?} a higher index from all the existing modal instances.
     */
    NgxSmartModalService.prototype.getHigherIndex = /**
     * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
     * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
     * Use it to make a modal appear foreground.
     *
     * @return {?} a higher index from all the existing modal instances.
     */
    function () {
        var /** @type {?} */ index = [1041];
        var /** @type {?} */ modals = this.getModalStack();
        modals.forEach(function (o) {
            index.push(o.modal.layerPosition);
        });
        return Math.max.apply(Math, index) + 1;
    };
    /**
     * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
     *
     * @return {?} the number of modal instances.
     */
    NgxSmartModalService.prototype.getModalStackCount = /**
     * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
     *
     * @return {?} the number of modal instances.
     */
    function () {
        return this.modalStack.length;
    };
    /**
     * Remove a modal instance from the modal stack.
     *
     * @param {?} id The modal identifier.
     * @return {?} the removed modal instance.
     */
    NgxSmartModalService.prototype.removeModal = /**
     * Remove a modal instance from the modal stack.
     *
     * @param {?} id The modal identifier.
     * @return {?} the removed modal instance.
     */
    function (id) {
        var /** @type {?} */ i = this.modalStack.findIndex(function (o) {
            return o.id === id;
        });
        if (i > -1) {
            this.modalStack.splice(i, 1);
        }
    };
    /**
     * Associate data to an identified modal. If the modal isn't already associated to some data, it creates a new
     * entry in the `modalData` array with its `id` and the given `data`. If the modal already has data, it rewrites
     * them with the new ones. Finally if no modal found it returns an error message in the console and false value
     * as method output.
     *
     * @param {?} data The data you want to associate to the modal.
     * @param {?} id The modal identifier.
     * @param {?=} force If true, overrides the previous stored data if there was.
     * @return {?} true if the given modal exists and the process has been tried, either false.
     */
    NgxSmartModalService.prototype.setModalData = /**
     * Associate data to an identified modal. If the modal isn't already associated to some data, it creates a new
     * entry in the `modalData` array with its `id` and the given `data`. If the modal already has data, it rewrites
     * them with the new ones. Finally if no modal found it returns an error message in the console and false value
     * as method output.
     *
     * @param {?} data The data you want to associate to the modal.
     * @param {?} id The modal identifier.
     * @param {?=} force If true, overrides the previous stored data if there was.
     * @return {?} true if the given modal exists and the process has been tried, either false.
     */
    function (data, id, force) {
        if (!!this.modalStack.find(function (o) {
            return o.id === id;
        })) {
            this.getModal(id).setData(data, force);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Retrieve modal data by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the associated modal data.
     */
    NgxSmartModalService.prototype.getModalData = /**
     * Retrieve modal data by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the associated modal data.
     */
    function (id) {
        return this.getModal(id).getData();
    };
    /**
     * Reset the data attached to a given modal.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the removed data or false if modal doesn't exist.
     */
    NgxSmartModalService.prototype.resetModalData = /**
     * Reset the data attached to a given modal.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the removed data or false if modal doesn't exist.
     */
    function (id) {
        if (!!this.modalStack.find(function (o) {
            return o.id === id;
        })) {
            var /** @type {?} */ removed = this.getModal(id).getData();
            this.getModal(id).removeData();
            return removed;
        }
        else {
            return false;
        }
    };
    /**
     * Close the latest opened modal if it has been declared as escapable
     * Using a debounce system because one or more modals could be listening
     * escape key press event.
     * @return {?}
     */
    NgxSmartModalService.prototype.closeLatestModal = /**
     * Close the latest opened modal if it has been declared as escapable
     * Using a debounce system because one or more modals could be listening
     * escape key press event.
     * @return {?}
     */
    function () {
        var /** @type {?} */ me = this;
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(function () {
            var /** @type {?} */ tmp;
            me.getOpenedModals().forEach(function (m) {
                if (m.modal.layerPosition > (!!tmp ? tmp.modal.layerPosition : 0 && m.modal.escapable)) {
                    tmp = m;
                }
            });
            return !!tmp ? tmp.modal.close() : false;
        }, 100);
    };
    NgxSmartModalService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    NgxSmartModalService.ctorParameters = function () { return []; };
    return NgxSmartModalService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSmartModalComponent = (function () {
    function NgxSmartModalComponent(_renderer, _changeDetectorRef, _ngxSmartModalService) {
        this._renderer = _renderer;
        this._changeDetectorRef = _changeDetectorRef;
        this._ngxSmartModalService = _ngxSmartModalService;
        this.closable = true;
        this.escapable = true;
        this.dismissable = true;
        this.identifier = '';
        this.customClass = 'nsm-dialog-animation-fade';
        this.visible = false;
        this.backdrop = true;
        this.force = true;
        this.hideDelay = 500;
        this.autostart = false;
        this.visibleChange = new core.EventEmitter();
        this.onClose = new core.EventEmitter();
        this.onCloseFinished = new core.EventEmitter();
        this.onDismiss = new core.EventEmitter();
        this.onDismissFinished = new core.EventEmitter();
        this.onAnyCloseEvent = new core.EventEmitter();
        this.onAnyCloseEventFinished = new core.EventEmitter();
        this.onOpen = new core.EventEmitter();
        this.onEscape = new core.EventEmitter();
        this.onDataAdded = new core.EventEmitter();
        this.onDataRemoved = new core.EventEmitter();
        this.layerPosition = 1041;
        this.overlayVisible = false;
        this.openedClass = false;
        this._data = null;
    }
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!!this.identifier && this.identifier.length) {
            this.layerPosition += this._ngxSmartModalService.getModalStackCount();
            this._ngxSmartModalService.addModal({ id: this.identifier, modal: this }, this.force);
            if (this.autostart) {
                this._ngxSmartModalService.open(this.identifier);
            }
        }
        else {
            throw new Error('identifier field isn’t set. Please set one before calling <ngx-smart-modal> in a template.');
        }
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._ngxSmartModalService.removeModal(this.identifier);
    };
    /**
     * @param {?=} top
     * @return {?}
     */
    NgxSmartModalComponent.prototype.open = /**
     * @param {?=} top
     * @return {?}
     */
    function (top) {
        var _this = this;
        if (top) {
            this.layerPosition = this._ngxSmartModalService.getHigherIndex();
        }
        this._renderer.addClass(document.body, 'dialog-open');
        this.overlayVisible = true;
        this.visible = true;
        setTimeout(function () {
            _this.openedClass = true;
            if (_this.target) {
                _this.targetPlacement();
            }
            _this._changeDetectorRef.markForCheck();
        });
        this.onOpen.emit(this);
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ me = this;
        this.openedClass = false;
        this.onClose.emit(this);
        this.onAnyCloseEvent.emit(this);
        if (this._ngxSmartModalService.getOpenedModals().length < 2) {
            this._renderer.removeClass(document.body, 'dialog-open');
        }
        setTimeout(function () {
            me.visibleChange.emit(me.visible);
            me.visible = false;
            me.overlayVisible = false;
            me._changeDetectorRef.markForCheck();
            me.onCloseFinished.emit(me);
            me.onAnyCloseEventFinished.emit(me);
        }, this.hideDelay);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxSmartModalComponent.prototype.dismiss = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ me = this;
        if (!this.dismissable) {
            return;
        }
        if (e.target.classList.contains('overlay')) {
            this.openedClass = false;
            this.onDismiss.emit(this);
            this.onAnyCloseEvent.emit(this);
            if (this._ngxSmartModalService.getOpenedModals().length < 2) {
                this._renderer.removeClass(document.body, 'dialog-open');
            }
            setTimeout(function () {
                me.visible = false;
                me.visibleChange.emit(me.visible);
                me.overlayVisible = false;
                me._changeDetectorRef.markForCheck();
                me.onDismissFinished.emit(me);
                me.onAnyCloseEventFinished.emit(me);
            }, this.hideDelay);
        }
    };
    /**
     * @param {?=} top
     * @return {?}
     */
    NgxSmartModalComponent.prototype.toggle = /**
     * @param {?=} top
     * @return {?}
     */
    function (top) {
        if (this.visible) {
            this.close();
        }
        else {
            this.open(top);
        }
    };
    /**
     * @param {?} className
     * @return {?}
     */
    NgxSmartModalComponent.prototype.addCustomClass = /**
     * @param {?} className
     * @return {?}
     */
    function (className) {
        if (!this.customClass.length) {
            this.customClass = className;
        }
        else {
            this.customClass += ' ' + className;
        }
    };
    /**
     * @param {?=} className
     * @return {?}
     */
    NgxSmartModalComponent.prototype.removeCustomClass = /**
     * @param {?=} className
     * @return {?}
     */
    function (className) {
        if (className) {
            this.customClass = this.customClass.replace(className, '').trim();
        }
        else {
            this.customClass = '';
        }
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.isVisible = /**
     * @return {?}
     */
    function () {
        return this.visible;
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.hasData = /**
     * @return {?}
     */
    function () {
        return !!this._data;
    };
    /**
     * @param {?} data
     * @param {?=} force
     * @return {?}
     */
    NgxSmartModalComponent.prototype.setData = /**
     * @param {?} data
     * @param {?=} force
     * @return {?}
     */
    function (data, force) {
        var _this = this;
        if (!this._data || (!!this._data && force)) {
            setTimeout(function () {
                _this._data = data;
                _this.onDataAdded.emit(_this._data);
            });
        }
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.getData = /**
     * @return {?}
     */
    function () {
        return this._data;
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.removeData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this._data = null;
            _this.onDataRemoved.emit(true);
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxSmartModalComponent.prototype.escapeKeyboardEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === 27 && this.visible) {
            if (!this.escapable) {
                return false;
            }
            else {
                this.onEscape.emit(this);
                this._ngxSmartModalService.closeLatestModal();
            }
        }
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.targetPlacement = /**
     * @return {?}
     */
    function () {
        if (!this.nsmDialog || !this.nsmContent || !this.nsmOverlay || !this.target) {
            return;
        }
        var /** @type {?} */ targetElementRect = document.querySelector(this.target).getBoundingClientRect();
        var /** @type {?} */ bodyRect = this.nsmOverlay.nativeElement.getBoundingClientRect();
        var /** @type {?} */ nsmContentRect = this.nsmContent.nativeElement.getBoundingClientRect();
        var /** @type {?} */ nsmDialogRect = this.nsmDialog.nativeElement.getBoundingClientRect();
        var /** @type {?} */ marginLeft = parseInt(/** @type {?} */ (getComputedStyle(this.nsmContent.nativeElement).marginLeft), 10);
        var /** @type {?} */ marginTop = parseInt(/** @type {?} */ (getComputedStyle(this.nsmContent.nativeElement).marginTop), 10);
        var /** @type {?} */ offsetTop = targetElementRect.top - nsmDialogRect.top - ((nsmContentRect.height - targetElementRect.height) / 2);
        var /** @type {?} */ offsetLeft = targetElementRect.left - nsmDialogRect.left - ((nsmContentRect.width - targetElementRect.width) / 2);
        if (offsetLeft + nsmDialogRect.left + nsmContentRect.width + (marginLeft * 2) > bodyRect.width) {
            offsetLeft = bodyRect.width - (nsmDialogRect.left + nsmContentRect.width) - (marginLeft * 2);
        }
        else if (offsetLeft + nsmDialogRect.left < 0) {
            offsetLeft = -nsmDialogRect.left;
        }
        if (offsetTop + nsmDialogRect.top + nsmContentRect.height + marginTop > bodyRect.height) {
            offsetTop = bodyRect.height - (nsmDialogRect.top + nsmContentRect.height) - marginTop;
        }
        if (offsetTop < 0) {
            offsetTop = 0;
        }
        this._renderer.setStyle(this.nsmContent.nativeElement, 'top', offsetTop + 'px');
        this._renderer.setStyle(this.nsmContent.nativeElement, 'left', offsetLeft + 'px');
    };
    NgxSmartModalComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ngx-smart-modal',
                    template: "\n    <div *ngIf=\"overlayVisible\"\n         [style.z-index]=\"visible ? layerPosition-1 : -1\"\n         [ngClass]=\"{'transparent':!backdrop, 'overlay':true, 'nsm-overlay-open':openedClass}\"\n         (click)=\"dismiss($event)\" #nsmOverlay>\n      <div [style.z-index]=\"visible ? layerPosition : -1\"\n           [ngClass]=\"['nsm-dialog', customClass, openedClass ? 'nsm-dialog-open': 'nsm-dialog-close']\" #nsmDialog>\n        <div class=\"nsm-content\" #nsmContent>\n          <div class=\"nsm-body\">\n            <ng-content></ng-content>\n          </div>\n          <button type=\"button\" *ngIf=\"closable\" (click)=\"close()\" aria-label=\"Close\" class=\"nsm-dialog-btn-close\">\n            <img\n              src=\"data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDMsNi4wNThjLTguMDc3LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDksMEw2LjA1OCw0NzYuNjkzYy04LjA3Nyw4LjA3Ny04LjA3NywyMS4xNzIsMCwyOS4yNDkgICAgQzEwLjA5Niw1MDkuOTgyLDE1LjM5LDUxMiwyMC42ODMsNTEyYzUuMjkzLDAsMTAuNTg2LTIuMDE5LDE0LjYyNS02LjA1OUw1MDUuOTQzLDM1LjMwNiAgICBDNTE0LjAxOSwyNy4yMyw1MTQuMDE5LDE0LjEzNSw1MDUuOTQzLDYuMDU4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDIsNDc2LjY5NEwzNS4zMDYsNi4wNTljLTguMDc2LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDgsMGMtOC4wNzcsOC4wNzYtOC4wNzcsMjEuMTcxLDAsMjkuMjQ4bDQ3MC42MzYsNDcwLjYzNiAgICBjNC4wMzgsNC4wMzksOS4zMzIsNi4wNTgsMTQuNjI1LDYuMDU4YzUuMjkzLDAsMTAuNTg3LTIuMDE5LDE0LjYyNC02LjA1N0M1MTQuMDE4LDQ5Ny44NjYsNTE0LjAxOCw0ODQuNzcxLDUwNS45NDIsNDc2LjY5NHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K\" />\n          </button>\n        </div>\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgxSmartModalComponent.ctorParameters = function () { return [
        { type: core.Renderer2, },
        { type: core.ChangeDetectorRef, },
        { type: NgxSmartModalService, },
    ]; };
    NgxSmartModalComponent.propDecorators = {
        "closable": [{ type: core.Input },],
        "escapable": [{ type: core.Input },],
        "dismissable": [{ type: core.Input },],
        "identifier": [{ type: core.Input },],
        "customClass": [{ type: core.Input },],
        "visible": [{ type: core.Input },],
        "backdrop": [{ type: core.Input },],
        "force": [{ type: core.Input },],
        "hideDelay": [{ type: core.Input },],
        "autostart": [{ type: core.Input },],
        "target": [{ type: core.Input },],
        "visibleChange": [{ type: core.Output },],
        "onClose": [{ type: core.Output },],
        "onCloseFinished": [{ type: core.Output },],
        "onDismiss": [{ type: core.Output },],
        "onDismissFinished": [{ type: core.Output },],
        "onAnyCloseEvent": [{ type: core.Output },],
        "onAnyCloseEventFinished": [{ type: core.Output },],
        "onOpen": [{ type: core.Output },],
        "onEscape": [{ type: core.Output },],
        "onDataAdded": [{ type: core.Output },],
        "onDataRemoved": [{ type: core.Output },],
        "nsmContent": [{ type: core.ViewChild, args: ['nsmContent',] },],
        "nsmDialog": [{ type: core.ViewChild, args: ['nsmDialog',] },],
        "nsmOverlay": [{ type: core.ViewChild, args: ['nsmOverlay',] },],
        "escapeKeyboardEvent": [{ type: core.HostListener, args: ['document:keyup', ['$event'],] },],
        "targetPlacement": [{ type: core.HostListener, args: ['window:resize',] },],
    };
    return NgxSmartModalComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSmartModalModule = (function () {
    function NgxSmartModalModule() {
    }
    /**
     * Use in AppModule: new instance of NgxSmartModal.
     * @return {?}
     */
    NgxSmartModalModule.forRoot = /**
     * Use in AppModule: new instance of NgxSmartModal.
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxSmartModalModule,
            providers: [NgxSmartModalService]
        };
    };
    /**
     * Use in features modules with lazy loading: new instance of NgxSmartModal.
     * @return {?}
     */
    NgxSmartModalModule.forChild = /**
     * Use in features modules with lazy loading: new instance of NgxSmartModal.
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxSmartModalModule,
            providers: [NgxSmartModalService]
        };
    };
    NgxSmartModalModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [NgxSmartModalComponent],
                    exports: [NgxSmartModalComponent],
                    imports: [common.CommonModule]
                },] },
    ];
    /** @nocollapse */
    NgxSmartModalModule.ctorParameters = function () { return []; };
    return NgxSmartModalModule;
}());

exports.NgxSmartModalService = NgxSmartModalService;
exports.NgxSmartModalComponent = NgxSmartModalComponent;
exports.NgxSmartModalModule = NgxSmartModalModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-smart-modal.umd.js.map
