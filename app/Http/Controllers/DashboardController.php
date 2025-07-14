<?php 

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Liability;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $assets = $user->assets()->latest()->get();
        $liabilities = $user->liabilities()->latest()->get();
        
        $totalAssets = $assets->sum('amount');
        $totalLiabilities = $liabilities->sum('amount');
        $netWorth = $totalAssets - $totalLiabilities;
        
        return Inertia::render('Dashboard', [
            'assets' => $assets,
            'liabilities' => $liabilities,
            'summary' => [
                'totalAssets' => $totalAssets,
                'totalLiabilities' => $totalLiabilities,
                'netWorth' => $netWorth
            ]
        ]);
    }
}
