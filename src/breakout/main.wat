(module
  ;; 
  ;;  javascript interface
  ;; 
  (import "game" "create" (func $gameCreate (result i32)))
  (import "game" "update" (func $gameUpdate (param i32)))
  (import "game" "initialize" (func $gameInitialize (param i32)))
  ;; 
  ;;  Main entry point
  ;; 
  (func (export "main")
    (local $game i32)

    (set_local $game (call $gameCreate))
    (call $gameInitialize (get_local $game))
  )

  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "add" (func $add))

  (func $sub (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.sub)
  (export "sub" (func $sub))

)