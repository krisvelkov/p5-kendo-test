import { useRef, useState } from 'react'
import { Button, type ButtonHandle } from '@progress/kendo-react-buttons'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'

function ConfirmDialogScreen() {
  const [open, setOpen] = useState(false)
  const [projectDeleted, setProjectDeleted] = useState(false)
  const triggerRef = useRef<ButtonHandle>(null)
  const restoreRef = useRef<ButtonHandle>(null)

  const closeDialog = (focusTarget = triggerRef) => {
    setOpen(false)
    // Return focus to a sensible control once the dialog unmounts (WAI-ARIA dialog pattern).
    requestAnimationFrame(() => focusTarget.current?.element?.focus())
  }

  const confirmDelete = () => {
    setProjectDeleted(true)
    // The trigger is disabled after deletion, so focus the follow-up action instead.
    closeDialog(restoreRef)
  }

  const restoreProject = () => {
    setProjectDeleted(false)
    requestAnimationFrame(() => triggerRef.current?.element?.focus())
  }

  return (
    <section className="screen" aria-labelledby="settings-heading">
      <h2 id="settings-heading">Project settings</h2>
      <p className="screen-intro">
        Deleting a project removes all of its data. You will be asked to confirm before anything is deleted.
      </p>

      <div role="status" aria-live="polite" className="status-message">
        {projectDeleted && <div className="k-messagebox k-messagebox-success">Project “Apollo” was deleted.</div>}
      </div>

      <Button
        ref={triggerRef}
        themeColor="error"
        aria-haspopup="dialog"
        disabled={projectDeleted}
        onClick={() => setOpen(true)}
      >
        Delete project
      </Button>
      {projectDeleted && (
        <Button ref={restoreRef} fillMode="flat" onClick={restoreProject} style={{ marginInlineStart: 8 }}>
          Restore sample project
        </Button>
      )}

      {open && (
        <Dialog title="Delete project?" onClose={() => closeDialog()} width={420} autoFocus>
          <p style={{ margin: 0 }}>
            This permanently deletes project <strong>Apollo</strong> and all of its data. This action cannot be undone.
          </p>
          <DialogActionsBar layout="end">
            <Button onClick={() => closeDialog()}>Cancel</Button>
            <Button themeColor="error" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </section>
  )
}

export default ConfirmDialogScreen
