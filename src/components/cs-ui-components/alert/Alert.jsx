import React, { useEffect, useState } from 'react';

function Alert({ type, message }) {
    const alertBorderClasses = {
        success:"border-green-400",
        warning:"border-yellow-300",
        error:"border-red-300",
    }
    const alertSvgFill = {
        success:"fill-green-600",
        warning:"fill-yellow-600",
        error:"fill-red-600",
    }
  return (
    <div className={`fixed bottom-9 left-9 bg-slate-300 dark:bg-slate-700 p-2 rounded border border-opacity-30 ${alertBorderClasses[type]} max-w-[400px] min-w-[250px] w-auto`}>
        <div className="flex items-center">
        <svg className={`flex-shrink-0 w-4 h-4 mr-2 ${alertSvgFill[type]}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <h3 className="text-base font-medium">{message}</h3>
    </div>
    </div>
  );
}

export default Alert;

