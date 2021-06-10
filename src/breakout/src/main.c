#include <stdio.h>
#include <dna.h>
#include "Demo.h"
#include "Demo-private.h"
#include "cfw.h"

int main(int argc, char *argv[])
{

	CFWRefPool *pool = cfw_new(cfw_refpool);

	Demo *demo = new(Demo, "Demo", 720, 480);

	Run(demo);

	cfw_unref(pool);

	return 0;
}

