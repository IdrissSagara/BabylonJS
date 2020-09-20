import { Mesh, PointerEventTypes, PhysicsImpostor, Vector3 } from "@babylonjs/core";

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
export default class MyScript extends Mesh {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init

    private constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {

        // ...
        this.physicsImpostor = new PhysicsImpostor(this, PhysicsImpostor.BoxImpostor, {
            mass: 3,
        });
        this._scene.onPointerObservable.add((event) => {
            if (event.type === PointerEventTypes.POINTERTAP) {
                let pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY);
                if (!pickResult) {return}

                if (pickResult.pickedMesh === this) {
                    this.applyImpulse(pickResult.ray.direction.multiply(new Vector3(10, 10, 10)), pickResult.pickedPoint);
                }

                /**
                 * if (pickResult) {
                    this.position.x = pickResult.pickedPoint.x;
                    this.position.y = pickResult.pickedPoint.y;
                    this.position.z = pickResult.pickedPoint.z;

                }
                 */
                
                
            }
        })
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
    }
}
