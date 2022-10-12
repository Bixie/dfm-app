<?php

use Joomla\CMS\Event\GenericEvent;
use Joomla\CMS\Factory;

// No direct access
defined('_JEXEC') or die;
$app = Factory::getApplication();
$event = new GenericEvent('getUserDfmAppData', [
    'user' => $app->getIdentity(),
    'result' => [],
]);
$app->getDispatcher()->dispatch('getUserDfmAppData', $event);
$user_data = $event['result'];

require JModuleHelper::getLayoutPath('mod_dfm_app');
