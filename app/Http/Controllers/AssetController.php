<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index()
    {
        $assets = auth()->user()->assets()->latest()->get();
        return Inertia::render('Assets/Index', [
            'assets' => $assets
        ]);
    }

    public function create()
    {
        return Inertia::render('Assets/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:1000'
        ]);

        auth()->user()->assets()->create($validated);

        return redirect()->route('dashboard')
            ->with('success', 'Asset added successfully!');
    }

    public function edit(Asset $asset)
    {
        $this->authorize('update', $asset);
        
        return Inertia::render('Assets/Edit', [
            'asset' => $asset
        ]);
    }

    public function update(Request $request, Asset $asset)
    {
        $this->authorize('update', $asset);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:1000'
        ]);

        $asset->update($validated);

        return redirect()->route('dashboard')
            ->with('success', 'Asset updated successfully!');
    }

    public function destroy(Asset $asset)
    {
        $this->authorize('delete', $asset);
        
        $asset->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Asset deleted successfully!');
    }
}
