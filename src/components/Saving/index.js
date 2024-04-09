import React from "react";

export default function Saving({ isSaving, successMessage }) {
    return (
        <div style={{ color: 'red' }}>
            {isSaving && !successMessage ? 'Saving...' : null}
            {successMessage ? successMessage : null}
        </div>
    );
}
