/**
 * @license ngx-smart-modal
 * MIT license
 */

import { ChangeDetectorRef, Component, EventEmitter, HostListener, Injectable, Input, NgModule, Output, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxSmartModalService {
    constructor() {
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
    addModal(modalInstance, force) {
        if (force) {
            const /** @type {?} */ i = this.modalStack.findIndex((o) => {
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
    }
    /**
     * Retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    getModal(id) {
        return this.modalStack.filter((o) => {
            return o.id === id;
        })[0].modal;
    }
    /**
     * Alias of `getModal` to retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    get(id) {
        return this.getModal(id);
    }
    /**
     * Open a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    open(id, force = false) {
        const /** @type {?} */ instance = this.modalStack.find((o) => {
            return o.id === id;
        });
        if (!!instance) {
            instance.modal.open(force);
        }
        else {
            throw new Error('Modal not found');
        }
    }
    /**
     * Close a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    close(id) {
        const /** @type {?} */ instance = this.modalStack.find((o) => {
            return o.id === id;
        });
        if (!!instance) {
            instance.modal.close();
        }
        else {
            throw new Error('Modal not found');
        }
    }
    /**
     * Toggles a given modal
     * If the retrieved modal is opened it closes it, else it opens it.
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    toggle(id, force = false) {
        const /** @type {?} */ instance = this.modalStack.find((o) => {
            return o.id === id;
        });
        if (!!instance) {
            instance.modal.toggle(force);
        }
        else {
            throw new Error('Modal not found');
        }
    }
    /**
     * Retrieve all the created modals.
     *
     * @return {?} an array that contains all modal instances.
     */
    getModalStack() {
        return this.modalStack;
    }
    /**
     * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
     *
     * @return {?} an array that contains all the opened modals.
     */
    getOpenedModals() {
        const /** @type {?} */ modals = [];
        this.modalStack.forEach((o) => {
            if (o.modal.visible) {
                modals.push(o);
            }
        });
        return modals;
    }
    /**
     * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
     * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
     * Use it to make a modal appear foreground.
     *
     * @return {?} a higher index from all the existing modal instances.
     */
    getHigherIndex() {
        const /** @type {?} */ index = [1041];
        const /** @type {?} */ modals = this.getModalStack();
        modals.forEach((o) => {
            index.push(o.modal.layerPosition);
        });
        return Math.max(...index) + 1;
    }
    /**
     * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
     *
     * @return {?} the number of modal instances.
     */
    getModalStackCount() {
        return this.modalStack.length;
    }
    /**
     * Remove a modal instance from the modal stack.
     *
     * @param {?} id The modal identifier.
     * @return {?} the removed modal instance.
     */
    removeModal(id) {
        const /** @type {?} */ i = this.modalStack.findIndex((o) => {
            return o.id === id;
        });
        if (i > -1) {
            this.modalStack.splice(i, 1);
        }
    }
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
    setModalData(data, id, force) {
        if (!!this.modalStack.find((o) => {
            return o.id === id;
        })) {
            this.getModal(id).setData(data, force);
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Retrieve modal data by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the associated modal data.
     */
    getModalData(id) {
        return this.getModal(id).getData();
    }
    /**
     * Reset the data attached to a given modal.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the removed data or false if modal doesn't exist.
     */
    resetModalData(id) {
        if (!!this.modalStack.find((o) => {
            return o.id === id;
        })) {
            const /** @type {?} */ removed = this.getModal(id).getData();
            this.getModal(id).removeData();
            return removed;
        }
        else {
            return false;
        }
    }
    /**
     * Close the latest opened modal if it has been declared as escapable
     * Using a debounce system because one or more modals could be listening
     * escape key press event.
     * @return {?}
     */
    closeLatestModal() {
        const /** @type {?} */ me = this;
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(() => {
            let /** @type {?} */ tmp;
            me.getOpenedModals().forEach((m) => {
                if (m.modal.layerPosition > (!!tmp ? tmp.modal.layerPosition : 0 && m.modal.escapable)) {
                    tmp = m;
                }
            });
            return !!tmp ? tmp.modal.close() : false;
        }, 100);
    }
}
NgxSmartModalService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgxSmartModalService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxSmartModalComponent {
    /**
     * @param {?} _renderer
     * @param {?} _changeDetectorRef
     * @param {?} _ngxSmartModalService
     */
    constructor(_renderer, _changeDetectorRef, _ngxSmartModalService) {
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
        this.visibleChange = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onCloseFinished = new EventEmitter();
        this.onDismiss = new EventEmitter();
        this.onDismissFinished = new EventEmitter();
        this.onAnyCloseEvent = new EventEmitter();
        this.onAnyCloseEventFinished = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onEscape = new EventEmitter();
        this.onDataAdded = new EventEmitter();
        this.onDataRemoved = new EventEmitter();
        this.layerPosition = 1041;
        this.overlayVisible = false;
        this.openedClass = false;
        this._data = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._ngxSmartModalService.removeModal(this.identifier);
    }
    /**
     * @param {?=} top
     * @return {?}
     */
    open(top) {
        if (top) {
            this.layerPosition = this._ngxSmartModalService.getHigherIndex();
        }
        this._renderer.addClass(document.body, 'dialog-open');
        this.overlayVisible = true;
        this.visible = true;
        setTimeout(() => {
            this.openedClass = true;
            if (this.target) {
                this.targetPlacement();
            }
            this._changeDetectorRef.markForCheck();
        });
        this.onOpen.emit(this);
    }
    /**
     * @return {?}
     */
    close() {
        const /** @type {?} */ me = this;
        this.openedClass = false;
        this.onClose.emit(this);
        this.onAnyCloseEvent.emit(this);
        if (this._ngxSmartModalService.getOpenedModals().length < 2) {
            this._renderer.removeClass(document.body, 'dialog-open');
        }
        setTimeout(() => {
            me.visibleChange.emit(me.visible);
            me.visible = false;
            me.overlayVisible = false;
            me._changeDetectorRef.markForCheck();
            me.onCloseFinished.emit(me);
            me.onAnyCloseEventFinished.emit(me);
        }, this.hideDelay);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    dismiss(e) {
        const /** @type {?} */ me = this;
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
            setTimeout(() => {
                me.visible = false;
                me.visibleChange.emit(me.visible);
                me.overlayVisible = false;
                me._changeDetectorRef.markForCheck();
                me.onDismissFinished.emit(me);
                me.onAnyCloseEventFinished.emit(me);
            }, this.hideDelay);
        }
    }
    /**
     * @param {?=} top
     * @return {?}
     */
    toggle(top) {
        if (this.visible) {
            this.close();
        }
        else {
            this.open(top);
        }
    }
    /**
     * @param {?} className
     * @return {?}
     */
    addCustomClass(className) {
        if (!this.customClass.length) {
            this.customClass = className;
        }
        else {
            this.customClass += ' ' + className;
        }
    }
    /**
     * @param {?=} className
     * @return {?}
     */
    removeCustomClass(className) {
        if (className) {
            this.customClass = this.customClass.replace(className, '').trim();
        }
        else {
            this.customClass = '';
        }
    }
    /**
     * @return {?}
     */
    isVisible() {
        return this.visible;
    }
    /**
     * @return {?}
     */
    hasData() {
        return !!this._data;
    }
    /**
     * @param {?} data
     * @param {?=} force
     * @return {?}
     */
    setData(data, force) {
        if (!this._data || (!!this._data && force)) {
            setTimeout(() => {
                this._data = data;
                this.onDataAdded.emit(this._data);
            });
        }
    }
    /**
     * @return {?}
     */
    getData() {
        return this._data;
    }
    /**
     * @return {?}
     */
    removeData() {
        setTimeout(() => {
            this._data = null;
            this.onDataRemoved.emit(true);
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    escapeKeyboardEvent(event) {
        if (event.keyCode === 27 && this.visible) {
            if (!this.escapable) {
                return false;
            }
            else {
                this.onEscape.emit(this);
                this._ngxSmartModalService.closeLatestModal();
            }
        }
    }
    /**
     * @return {?}
     */
    targetPlacement() {
        if (!this.nsmDialog || !this.nsmContent || !this.nsmOverlay || !this.target) {
            return;
        }
        const /** @type {?} */ targetElementRect = document.querySelector(this.target).getBoundingClientRect();
        const /** @type {?} */ bodyRect = this.nsmOverlay.nativeElement.getBoundingClientRect();
        const /** @type {?} */ nsmContentRect = this.nsmContent.nativeElement.getBoundingClientRect();
        const /** @type {?} */ nsmDialogRect = this.nsmDialog.nativeElement.getBoundingClientRect();
        const /** @type {?} */ marginLeft = parseInt(/** @type {?} */ (getComputedStyle(this.nsmContent.nativeElement).marginLeft), 10);
        const /** @type {?} */ marginTop = parseInt(/** @type {?} */ (getComputedStyle(this.nsmContent.nativeElement).marginTop), 10);
        let /** @type {?} */ offsetTop = targetElementRect.top - nsmDialogRect.top - ((nsmContentRect.height - targetElementRect.height) / 2);
        let /** @type {?} */ offsetLeft = targetElementRect.left - nsmDialogRect.left - ((nsmContentRect.width - targetElementRect.width) / 2);
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
    }
}
NgxSmartModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-smart-modal',
                template: `
    <div *ngIf="overlayVisible"
         [style.z-index]="visible ? layerPosition-1 : -1"
         [ngClass]="{'transparent':!backdrop, 'overlay':true, 'nsm-overlay-open':openedClass}"
         (click)="dismiss($event)" #nsmOverlay>
      <div [style.z-index]="visible ? layerPosition : -1"
           [ngClass]="['nsm-dialog', customClass, openedClass ? 'nsm-dialog-open': 'nsm-dialog-close']" #nsmDialog>
        <div class="nsm-content" #nsmContent>
          <div class="nsm-body">
            <ng-content></ng-content>
          </div>
          <button type="button" *ngIf="closable" (click)="close()" aria-label="Close" class="nsm-dialog-btn-close">
            <img
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDMsNi4wNThjLTguMDc3LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDksMEw2LjA1OCw0NzYuNjkzYy04LjA3Nyw4LjA3Ny04LjA3NywyMS4xNzIsMCwyOS4yNDkgICAgQzEwLjA5Niw1MDkuOTgyLDE1LjM5LDUxMiwyMC42ODMsNTEyYzUuMjkzLDAsMTAuNTg2LTIuMDE5LDE0LjYyNS02LjA1OUw1MDUuOTQzLDM1LjMwNiAgICBDNTE0LjAxOSwyNy4yMyw1MTQuMDE5LDE0LjEzNSw1MDUuOTQzLDYuMDU4eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS45NDIsNDc2LjY5NEwzNS4zMDYsNi4wNTljLTguMDc2LTguMDc3LTIxLjE3Mi04LjA3Ny0yOS4yNDgsMGMtOC4wNzcsOC4wNzYtOC4wNzcsMjEuMTcxLDAsMjkuMjQ4bDQ3MC42MzYsNDcwLjYzNiAgICBjNC4wMzgsNC4wMzksOS4zMzIsNi4wNTgsMTQuNjI1LDYuMDU4YzUuMjkzLDAsMTAuNTg3LTIuMDE5LDE0LjYyNC02LjA1N0M1MTQuMDE4LDQ5Ny44NjYsNTE0LjAxOCw0ODQuNzcxLDUwNS45NDIsNDc2LjY5NHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
          </button>
        </div>
      </div>
    </div>
  `
            },] },
];
/** @nocollapse */
NgxSmartModalComponent.ctorParameters = () => [
    { type: Renderer2, },
    { type: ChangeDetectorRef, },
    { type: NgxSmartModalService, },
];
NgxSmartModalComponent.propDecorators = {
    "closable": [{ type: Input },],
    "escapable": [{ type: Input },],
    "dismissable": [{ type: Input },],
    "identifier": [{ type: Input },],
    "customClass": [{ type: Input },],
    "visible": [{ type: Input },],
    "backdrop": [{ type: Input },],
    "force": [{ type: Input },],
    "hideDelay": [{ type: Input },],
    "autostart": [{ type: Input },],
    "target": [{ type: Input },],
    "visibleChange": [{ type: Output },],
    "onClose": [{ type: Output },],
    "onCloseFinished": [{ type: Output },],
    "onDismiss": [{ type: Output },],
    "onDismissFinished": [{ type: Output },],
    "onAnyCloseEvent": [{ type: Output },],
    "onAnyCloseEventFinished": [{ type: Output },],
    "onOpen": [{ type: Output },],
    "onEscape": [{ type: Output },],
    "onDataAdded": [{ type: Output },],
    "onDataRemoved": [{ type: Output },],
    "nsmContent": [{ type: ViewChild, args: ['nsmContent',] },],
    "nsmDialog": [{ type: ViewChild, args: ['nsmDialog',] },],
    "nsmOverlay": [{ type: ViewChild, args: ['nsmOverlay',] },],
    "escapeKeyboardEvent": [{ type: HostListener, args: ['document:keyup', ['$event'],] },],
    "targetPlacement": [{ type: HostListener, args: ['window:resize',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxSmartModalModule {
    /**
     * Use in AppModule: new instance of NgxSmartModal.
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgxSmartModalModule,
            providers: [NgxSmartModalService]
        };
    }
    /**
     * Use in features modules with lazy loading: new instance of NgxSmartModal.
     * @return {?}
     */
    static forChild() {
        return {
            ngModule: NgxSmartModalModule,
            providers: [NgxSmartModalService]
        };
    }
}
NgxSmartModalModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxSmartModalComponent],
                exports: [NgxSmartModalComponent],
                imports: [CommonModule]
            },] },
];
/** @nocollapse */
NgxSmartModalModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Public classes.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { NgxSmartModalService, NgxSmartModalComponent, NgxSmartModalModule };
//# sourceMappingURL=ngx-smart-modal.js.map
