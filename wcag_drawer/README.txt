ACCESSIBILTY
Drawers should have aria attributes, and it's a pain in the ass. But it would
be a much bigger pain to have poor vision. Use the baby framework provided
by this module to create easy accessible drawers.

REQUIREMENTS
Begin by adding wcag_drawer/wcag-drawer as a dependency to your custom theme
or by attaching that library on desired pages.

Every drawer handle must have...
1. class="wcag-drawer-handle"
2. aria-controls="my-drawer-id"> //replace my-drawer-id with appropriate value

Every drawer must have...
1. id="my-drawer-id" //this must correspond to the aria-controls attribute of the handle
2. class="wcag-drawer"

It is recommended that your drawer handle be a button, but it could be a link
with role="button". After all, we're trying to be accessible. There are styles
in the library that remove most default button styles from a button given the
wcag-drawer-handle class.

BONUS CLASSES:
There are some bonus classes that do things. They are optional.

chevron      : Add this class to the handle to give it a chevron
desktop-open : Add this to a wcag-drawer so force it open on desktop. It only
               really acts like a drawer on mobile. Put this on the handle too
               to hide the chevron.
load-open    : Add this to a wcag-drawer to have the drawer load open. It can
               still open and close like normal, which is different from the
               desktop-open class which only acts like a drawer on mobile.

BONUS ATTRIBUTES:
These are optional.

data-wcag-focus : Set to true on drawer if the drawer contains a form and you want to auto
                  focus to the first form element. Make sure it's actually a string
                  value of "true".

data-slide-time : This number gets passed to jquery slide() functions. The
                  default is 400. It's a time in ms. If you want the drawer to
                  open/close instantly add data-slide-time="0".


EXAMPLES:

<button class='wcag-drawer-handle chevron' aria-controls="my-drawer">Open!</button>
<div id="my-drawer" class='wcag-drawer' data-slide-time="0"> <!-- instant open/close -->
 <!-- STUFF IN DRAWER -->
</div>

or maybe...

<a role='button' class='wcag-drawer-handle desktop-open' aria-controls="my-drawer">Open!</button>
<div id="my-drawer" class='wcag-drawer desktop-open' data-wcag-focus="true">
 <!-- FORM IN DRAWER -->
</div>

PRO-TIPS
1. Don't put margin on the drawer.
