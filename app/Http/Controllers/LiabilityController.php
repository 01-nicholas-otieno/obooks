<?php

namespace App\Http\Controllers;

use App\Models\Liability;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LiabilityController extends Controller
{
    public function index()
    {
        $liabilities = auth()->user()->liabilities()->latest()->get();
        return Inertia::render('Liabilities/Index', [
            'liabilities' => $liabilities
        ]);
    }

    public function create()
    {
        return Inertia::render('Liabilities/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:1000'
        ]);

        auth()->user()->liabilities()->create($validated);

        return redirect()->route('dashboard')
            ->with('success', 'Liability added successfully!');
    }

    public function edit(Liability $liability)
    {
        $this->authorize('update', $liability);
        
        return Inertia::render('Liabilities/Edit', [
            'liability' => $liability
        ]);
    }

    public function update(Request $request, Liability $liability)
    {
        $this->authorize('update', $liability);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:1000'
        ]);

        $liability->update($validated);

        return redirect()->route('dashboard')
            ->with('success', 'Liability updated successfully!');
    }

    public function destroy(Liability $liability)
    {
        $this->authorize('delete', $liability);
        
        $liability->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Liability deleted successfully!');
    }
}
