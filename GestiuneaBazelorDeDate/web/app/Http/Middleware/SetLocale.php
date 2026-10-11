<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocale
{
    /**
     * Handle an incoming request and set application locale based on session.
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = Session::get('locale', config('app.locale', 'en'));

        if (in_array($locale, ['en', 'ro'])) {
            App::setLocale($locale);
        }

        return $next($request);
    }
}
