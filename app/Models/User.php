<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }

    public function liabilities(): HasMany
    {
        return $this->hasMany(Liability::class);
    }

    public function getTotalAssetsAttribute(): float
    {
        return $this->assets()->sum('amount');
    }

    public function getTotalLiabilitiesAttribute(): float
    {
        return $this->liabilities()->sum('amount');
    }

    public function getNetWorthAttribute(): float
    {
        return $this->getTotalAssetsAttribute() - $this->getTotalLiabilitiesAttribute();
    }
}
