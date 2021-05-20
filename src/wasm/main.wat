(module
  ;; 
  ;;  javascript interface
  ;; 
  (import "game" "createGame" (func $createGame (result i32)))
  (import "game" "update" (func $update (param i32)))
  ;; 
  ;;  Main entry point
  ;; 
  (func (export "main")
    (local $game i32)

    (set_local $game (call $createGame))
    (call $update (get_local $game))
  )
)