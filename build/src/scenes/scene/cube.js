"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameas
 *      - Transform nodes
 *
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
var MyScript = /** @class */ (function (_super) {
    __extends(MyScript, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function MyScript() {
        var _this = this;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    MyScript.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the scene starts.
     */
    MyScript.prototype.onStart = function () {
        var _this = this;
        // ...
        this.physicsImpostor = new core_1.PhysicsImpostor(this, core_1.PhysicsImpostor.BoxImpostor, {
            mass: 3,
        });
        this._scene.onPointerObservable.add(function (event) {
            if (event.type === core_1.PointerEventTypes.POINTERTAP) {
                var pickResult = _this._scene.pick(_this._scene.pointerX, _this._scene.pointerY);
                if (!pickResult) {
                    return;
                }
                if (pickResult.pickedMesh === _this) {
                    _this.applyImpulse(pickResult.ray.direction.multiply(new core_1.Vector3(10, 10, 10)), pickResult.pickedPoint);
                }
                /**
                 * if (pickResult) {
                    this.position.x = pickResult.pickedPoint.x;
                    this.position.y = pickResult.pickedPoint.y;
                    this.position.z = pickResult.pickedPoint.z;

                }
                 */
            }
        });
    };
    /**
     * Called each frame.
     */
    MyScript.prototype.onUpdate = function () {
        // ...
    };
    return MyScript;
}(core_1.Mesh));
exports.default = MyScript;
//# sourceMappingURL=cube.js.map