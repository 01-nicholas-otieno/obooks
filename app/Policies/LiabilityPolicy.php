<?php

namespace App\Policies;

use App\Models\Liability;
use App\Models\User;

class LiabilityPolicy
{
    public function update(User $user, Liability $liability): bool
    {
        return $user->id === $liability->user_id;
    }

    public function delete(User $user, Liability $liability): bool
    {
        return $user->id === $liability->user_id;
    }
}
