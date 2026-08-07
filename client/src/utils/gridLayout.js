// client/src/utils/gridLayout.js
//
// Helper that picks the correct grid layout class based on how many items
// are shown, so services and sub-services always arrange neatly:
//   - 3 items -> one line of 3 (gn-grid-3)
//   - 4 items -> 2x2 (gn-grid-2)
//   - 2 items -> one line of 2 (gn-grid-2)
//   - 1 item  -> single centered card (gn-grid-1)
//   - anything else -> fall back to 2 columns

export function gridClassFor(count) {
  if (count === 3) return "gn-grid-3";
  if (count === 1) return "gn-grid-1";
  return "gn-grid-2";
}
